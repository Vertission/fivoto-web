import { useState } from 'react';
import { useMutation } from '@apollo/client';

import schema from '../../schema';

export default function useDeleteMutation() {
  const [loading, setLoading] = useState(false);
  const [mutatedDeleteAd] = useMutation(schema.mutation.DELETE_AD, {
    onError(error) {
      console.log(error);
    },
  });

  async function create(id) {
    setLoading(true);
    try {
      await mutatedDeleteAd({
        variables: {
          id,
        },
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return [create, { loading }];
}
