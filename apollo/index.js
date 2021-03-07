import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { concatPagination } from '@apollo/client/utilities';
import merge from 'deepmerge';
import { setContext } from '@apollo/client/link/context';
import { Auth } from 'aws-amplify';
import isEqual from 'lodash/isEqual';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

const errorLink = new onError(({ graphQLErrors, networkError }) => {
  if (process.env.NODE_ENV === 'development') {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path, code }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}, code: ${code}`
        );

        if (message === 'NotAuthorizedException') {
          console.error('User not authorized');
        }
      });
    }

    if (networkError) {
      console.error(networkError);
    }
  }

  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      if (message === 'NotAuthorizedException') {
        // signOut();
      }
    });
  }

  if (networkError) {
  }
});

const httpLink = new HttpLink({
  uri: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/' : 'https://lk.endpoint.fivoto.com',
  credentials: 'same-origin',
});

const authLink = setContext(async (_, { headers }) => {
  try {
    const {
      accessToken: { jwtToken },
    } = await Auth.currentSession();

    return {
      headers: {
        ...headers,
        authorization: jwtToken,
      },
    };
  } catch (error) {
    if (error === 'No current user') return null;
    Sentry.captureException(error);
  }
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
