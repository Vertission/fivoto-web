import { gql } from '@apollo/client';

export const CREATE_AD = gql`
  mutation createAd($data: createAdInput!) {
    createAd(data: $data)
  }
`;

export const UPDATE_AD = gql`
  mutation updateAd($data: updateAdInput!) {
    updateAd(data: $data)
  }
`;
