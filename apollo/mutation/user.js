import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useSnackbar } from 'notistack';

import profile from '../../service/amplify/storage/profile';

const UPDATE_USER = gql`
  mutation updateUser($data: updateUserInput!) {
    updateUser(data: $data) {
      id
      name
      email
      profile
      createdAt
      updatedAt
    }
  }
`;

export default function useUpdateUser(user) {
  const [mutate] = useMutation(UPDATE_USER);

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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

      enqueueSnackbar('Profile updated successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return [updateUser, { loading }];
}
