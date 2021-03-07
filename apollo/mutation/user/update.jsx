import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPDATE_USER = gql`
  mutation updateUser($data: updateUserInput!) {
    updateUser(data: $data) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;

const REFETCH_ME = gql`
  query me {
    me {
      id
      name
      email
      updatedAt
    }
  }
`;

export function useUpdateUser() {
  const [data, setData] = useState(null);

  const [mutate, { loading }] = useMutation(UPDATE_USER, {
    onCompleted() {},
    onError(error) {},
  });

  const updateUser = (data) => {
    setData(data);
    mutate({
      variables: {
        data,
      },
      refetchQueries: () => [{ query: REFETCH_ME }],
    });
  };

  return [updateUser, { loading }];
}
