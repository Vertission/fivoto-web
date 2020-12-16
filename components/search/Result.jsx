import React, { useState } from 'react';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';

import { CircularProgress, Button, Typography } from '@material-ui/core';

import schema from '../../apollo/schema';
import { Ads } from '../ui';

export default function SearchResult({ searchQuery, setSearchQuery }) {
  const classes = useStyles();

  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const { data, loading, fetchMore } = useQuery(schema.query.SEARCH, {
    variables: {
      offset: 0,
      limit: 20,
      query: searchQuery,
      category: {},
      location: {},
    },
    notifyOnNetworkStatusChange: true,
  });

  const _onLoadMore = () => {
    if (data.search.ads.length === data.search.total) return null;
    else {
      setFetchMoreLoading(true);
      fetchMore({
        query: schema.query.SEARCH,
        variables: {
          offset: data.search.ads.length,
          limit: 20,
          query: searchQuery,
          category: {},
          location: {},
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          fetchMoreResult.search.ads = [
            ...prevResult.search.ads,
            ...fetchMoreResult.search.ads,
          ];

          return fetchMoreResult;
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

  const { ads, total } = data.search;

  if (_.isEmpty(ads))
    return (
      <div className={classes.wide}>
        <Typography>No ads found</Typography>
        <Button
          onClick={() => {
            window.location.reload();
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
      <Ads data={ads} />
      <div className={classes.loadMore_container}>
        {fetchMoreLoading ? (
          <CircularProgress size={30} />
        ) : (
          <Button
            color='primary'
            variant='contained'
            size='large'
            onClick={_onLoadMore}
            style={{ display: ads.length === total ? 'none' : 'inherit' }}
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
