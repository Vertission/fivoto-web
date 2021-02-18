import { useState } from 'react';
import { useMutation } from '@apollo/client';
import _ from 'lodash';

import uploadAdPhotos from '../../../service/amplify/storage/uploadAdPhotos';

import schema from '../../schema';

import { dispatch } from '../../../components/post/Context';

export default function useCreateMutation() {
  const [loading, setLoading] = useState(false);
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
    console.log(data);
    setLoading(true);
    try {
      const publishingDate = new Date().toISOString();

      setStatus('start publishing ad');
      const {
        data: { createAd },
      } = await mutateCreateAd({
        variables: {
          data: {
            type: 'SELL',
            category: data.category,
            location: data.location,
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
      await mutateUpdateAd({
        variables: {
          data: {
            id: createAd,
            photos: uploadedPhotosKeys,
            updatedAt: publishingDate,
          },
        },
      });

      // await analytics().logEvent('post_ad', {
      //   category: data.category,
      //   location: data.location,
      // }); // ANALYTIC

      setLoading(false);
      setStatus(null);

      dispatch('RESET_CONTEXT');

      if (createAdMutationResponse.error || updateAdMutationResponse.error) {
      } else console.log('post published successfully');

      // navigate to ads

      return null;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return [create, { loading, status }];
}
