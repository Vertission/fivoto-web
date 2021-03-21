import { gql } from '@apollo/client';

export const CREATE_AD = gql`
  mutation($data: createAdInput!) {
    createAd(data: $data)
  }
`;

export const UPDATE_AD = gql`
  mutation($data: updateAdInput!) {
    updateAd(data: $data)
  }
`;
export const DELETE_AD = gql`
  mutation deleteAd($id: ID!) {
    deleteAd(id: $id)
  }
`;

export const UPDATE_USER = gql`
  mutation($data: updateUserInput!) {
    updateUser(data: $data)
  }
`;
