import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

import profile from '../../service/amplify/storage/profile';

import schema from '../schema';

export default function useUpdateUser(onCompleted, onError) {
  const [mutate, { client }] = useMutation(schema.mutation.UPDATE_USER);

  const [loading, setLoading] = useState(false);

  async function updateUser(data, user_id) {
    setLoading(true);
    try {
      if (data.profile) {
        const profile_url = await profile(data.profile, user_id);
        data.profile = profile_url;
      } else {
        delete data.profile;
      }

      await mutate({
        variables: {
          data,
        },
      });

      const { me } = client.cache.readQuery({ query: schema.query.ME });

      if (data.profile) {
        data.profile = [process.env.NEXT_PUBLIC_AWS_S3_PREFIX, data.profile].join('');
      }

      client.cache.writeQuery({ query: schema.query.ME, data: { me: { ...me, ...data } } });
      setLoading(false);
      if (onCompleted) onCompleted({ ...me, ...data });
    } catch (error) {
      console.log(error);

      setLoading(false);
      if (onError) onError(error);
    }
  }

  return [updateUser, { loading }];
}
