import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';

import _ from 'lodash';

import uploadAdPhotos from '../../../service/amplify/storage/uploadAdPhotos';

import schema from '../../schema';

import { dispatch } from '../../../components/post/Context';

import { snackbar } from '../../../utils';

export default function useUpdateMutation(setLoading) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [status, setStatus] = useState(null);

  const [mutateUpdateAd, updateAdMutationResponse] = useMutation(schema.mutation.UPDATE_AD, {
    onError(error) {
      console.log(error);
    },
  });

  async function create(data) {
    setLoading(true);
    try {
      const updatingDate = new Date().toISOString();

      setStatus('start updating ad');

      const uploadedPhotosKeys = await uploadAdPhotos(data.photos, data.id, setStatus);

      setStatus('updating ad');
      const {
        data: { updateAd },
      } = await mutateUpdateAd({
        variables: {
          data: {
            id: data.id,
            category: {
              field: data.category.field,
              item: data.category.item,
            },
            location: {
              district: data.location.district,
              city: data.location.city,
            },
            title: data.title.trim(),
            price: _.toNumber(data.price),
            description: data.description.trim(),
            phone: data.phone,
            fields: _.mapValues(data.fields, (value) => {
              if (typeof value === 'string') return value.trim();
              else return value;
            }),
            photos: uploadedPhotosKeys,
            updatedAt: updatingDate,
          },
        },
        refetchQueries: [{ query: schema.query.AD, variables: { id: data.id } }],
      });

      setLoading(false);
      setStatus(null);

      dispatch('RESET_CONTEXT');

      if (updateAdMutationResponse.error) {
        enqueueSnackbar('Error while updating Ad', snackbar.ERROR_TOP_CENTER);
        return router.push(`/`);
      } else {
        enqueueSnackbar('Ad updated successfully', snackbar.SUCCESS_TOP_CENTER);
        return router.push(`/ad/${updateAd}`);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return [create, { status }];
}
