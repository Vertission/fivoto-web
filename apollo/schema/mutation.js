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
