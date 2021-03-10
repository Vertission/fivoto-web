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

export const CONFIG = gql`
  query {
    config
  }
`;

export const CATEGORY = gql`
  query {
    category
  }
`;

export const LOCATION = gql`
  query {
    location
  }
`;

export const FIELD = gql`
  query {
    fields
  }
`;

export const SEARCH = gql`
  query search($first: Int, $cursor: ID, $filter: searchFilterInput) {
    search_relay(first: $first, after: $cursor, filter: $filter) {
      edges {
        cursor
        node {
          id
          title
          price
          photos
          createdAt
          location {
            district
            city
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const ME = gql`
  query me {
    me {
      id
      name
      email
      profile
      createdAt
      updatedAt
    }
  }
`;
