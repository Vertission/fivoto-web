import { gql } from '@apollo/client';

export const AD = gql`
  query($id: ID!) {
    ad(id: $id) {
      id
      slug
      status
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
      user {
        id
        name
      }
    }
  }
`;

export const ADS = gql`
  query($first: Int, $cursor: String, $filter: searchFilterInput) {
    ads(first: $first, after: $cursor, filter: $filter) {
      edges {
        cursor
        node {
          id
          slug
          status
          title
          price
          photos
          location {
            city
            district
          }
          category {
            item
            field
          }
          createdAt
        }
      }
      pageInfo {
        endCursor
        hasNextPage
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

export const ME = gql`
  query me {
    me {
      id
      name
      email
      email_verified
      profile
      createdAt
      updatedAt
    }
  }
`;
