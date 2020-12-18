import React, { useState, useContext } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';

import { CircularProgress, Button, Typography } from '@material-ui/core';

import schema from '../../apollo/schema';
import { Ads } from '../common';

import { Context as SearchContext } from './modules/context';

export default function SearchResult() {
  const classes = useStyles();

  const { query, location, category, first } = useContext(SearchContext);

  const router = useRouter();
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const { data, loading, fetchMore } = useQuery(schema.query.SEARCH, {
    variables: {
      first,
      filter: {
        query,
        location: {
          district: location.district,
          city: location.city,
        },
        category: {
          field: category.field,
          item: category.item,
        },
      },
    },
  });

  const _onLoadMore = () => {
    if (data.search_relay.pageInfo.hasNextPage) {
      setFetchMoreLoading(true);
      fetchMore({
        variables: {
          cursor: data.search_relay.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.search_relay.edges;
          const pageInfo = fetchMoreResult.search_relay.pageInfo;

          return newEdges.length
            ? {
                search_relay: {
                  __typename: previousResult.search_relay.__typename,
                  edges: [...previousResult.search_relay.edges, ...newEdges],
                  pageInfo,
                },
              }
            : previousResult;
        },
      }).then(({ loading }) => {
        setFetchMoreLoading(loading);
      });
    }
  };

  if (loading)
    return (
      <div className={classes.wide}>
        <CircularProgress />
      </div>
    );

  const nodes = data.search_relay.edges.map((edge) => edge.node);
  console.log('Boolean(nodes.length)', Boolean(nodes.length));

  if (!Boolean(nodes.length))
    return (
      <div className={classes.wide}>
        <Typography>No ads found</Typography>
        <Button
          onClick={() => {
            router.push({ query: { query: null } }).then(() => {
              window.location.reload();
            });
          }}
          className={classes.show_latest_ads}
          color='primary'
        >
          show latest ads
        </Button>
      </div>
    );

  return (
    <div className={classes.root}>
      <Ads data={nodes} />
      <div className={classes.loadMore_container}>
        {fetchMoreLoading ? (
          <CircularProgress size={30} />
        ) : (
          <Button
            color='primary'
            variant='contained'
            size='large'
            onClick={_onLoadMore}
            style={{
              display: data.search_relay.pageInfo.hasNextPage
                ? 'inherit'
                : 'none',
            }}
          >
            load more
          </Button>
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  wide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: `calc(100vh - ${theme.spacing(20)})`,
  },
  loadMore_container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
  show_latest_ads: {
    marginLeft: theme.spacing(3),
  },
}));
