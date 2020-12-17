import { gql } from '@apollo/client';

export const AD = gql`
  query ad($id: ID!) {
    ad(id: $id) {
      id
      type
      category {
        field
        item
      }
      location {
        district
        city
      }
      title
      price
      description
      photos
      phone
      fields
      createdAt
      updatedAt
      expireAt
      user {
        id
        name
      }
    }
  }
`;

export const CATEGORY = gql`
  query category {
    category
  }
`;

export const LOCATION = gql`
  query location {
    location
  }
`;

export const SEARCH = gql`
  query search($first: Int, $cursor: ID, $filter: searchFilterInput) {
    search_relay(first: $first, after: $cursor, filter: $filter)
  }
`;
