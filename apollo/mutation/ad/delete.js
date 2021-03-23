import { gql } from '@apollo/client';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';

import schema from '../../schema';

import { snackbar } from '../../../utils';

export default function useDeleteMutation() {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [mutatedDeleteAd, deleteAdMutationResponse] = useMutation(schema.mutation.DELETE_AD, {
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
        refetchQueries: [{ query: ME_PUBLISHED_ADS }],
      });

      setLoading(false);

      if (deleteAdMutationResponse.error) {
        enqueueSnackbar('Error while deleting Ad', snackbar.ERROR_TOP_CENTER);
      } else {
        enqueueSnackbar('Ad deleted successfully', snackbar.SUCCESS_TOP_CENTER);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return [create, { loading }];
}

const ME_PUBLISHED_ADS = gql`
  query {
    me {
      publishedAds {
        id
        slug
        title
        price
        photos
        expireAt
      }
    }
  }
`;
