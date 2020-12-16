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

export const SEARCH = gql`
  query search(
    $offset: Int
    $limit: Int
    $query: String
    $category: categoryInput
    $location: locationInput
  ) {
    search(
      offset: $offset
      limit: $limit
      query: $query
      category: $category
      location: $location
    ) {
      ads {
        id
        title
        price
        photos
        location {
          city
        }
        createdAt
      }
      total
    }
  }
`;
