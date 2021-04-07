import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import _ from 'lodash';

import uploadAdPhotos from '../../../service/amplify/storage/uploadAdPhotos';

import schema from '../../schema';

import { dispatch } from '../../../components/post/Context';

import { snackbar } from '../../../utils';

export default function useCreateMutation(setLoading) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [status, setStatus] = useState(null);

  const [mutateCreateAd, createAdMutationResponse] = useMutation(schema.mutation.CREATE_AD, {
    onError(error) {
      console.log(error);
    },
  });

  const [mutateUpdateAd, updateAdMutationResponse] = useMutation(schema.mutation.UPDATE_AD, {
    onError(error) {
      console.log(error);
    },
  });

  async function create(data) {
    setLoading(true);
    try {
      const publishingDate = new Date().toISOString();

      setStatus('start publishing ad');
      const {
        data: { createAd },
      } = await mutateCreateAd({
        variables: {
          data: {
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
            createdAt: publishingDate,
          },
        },
      });

      const uploadedPhotosKeys = await uploadAdPhotos(data.photos, createAd, setStatus);

      setStatus('publishing ad');
      const {
        data: { updateAd },
      } = await mutateUpdateAd({
        variables: {
          data: {
            id: createAd,
            photos: uploadedPhotosKeys,
            updatedAt: publishingDate,
          },
        },
      });

      setLoading(false);
      setStatus(null);

      dispatch('RESET_CONTEXT');

      if (createAdMutationResponse.error || updateAdMutationResponse.error) {
        enqueueSnackbar('Error while publishing Ad', snackbar.ERROR_TOP_CENTER);
        return router.push(`/`);
      } else {
        enqueueSnackbar('Ad published successfully', snackbar.SUCCESS_TOP_CENTER);
        return router.push(`/ad/${updateAd}`);
      }
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error while publishing Ad', snackbar.ERROR_TOP_CENTER);
      return router.push(`/`);
    }
  }

  return [create, { status }];
}
