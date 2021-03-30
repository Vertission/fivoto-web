import React, { useState, useContext } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';

import { CircularProgress, Button, Typography } from '@material-ui/core';

import schema from '../../apollo/schema';
import Ads from './modules/Ads'; // TODO: make this to a nice folder.

import { Context as SearchContext, dispatch as SearchDispatch } from './modules/context';

export default function SearchResult({ setSearch }) {
  const classes = useStyles();

  const { location, category, first } = useContext(SearchContext);

  const router = useRouter();
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const { data, loading, fetchMore } = useQuery(schema.query.ADS, {
    variables: {
      first,
      filter: {
        query: router.query?.query,
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

  if (loading)
    return (
      <div className={classes.wide}>
        <CircularProgress />
      </div>
    );

  const nodes = data.ads.edges.map((edge) => edge.node);
  const pageInfo = data.ads.pageInfo;

  if (!Boolean(nodes.length))
    return (
      <div className={classes.wide}>
        <Typography>No ads found</Typography>
        <Button
          onClick={() => {
            router.push({
              query: { query: null },
              pathname: '/search/sri-lanka/all-categories',
            });

            setSearch('');
            SearchDispatch('SET_RESET');
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
            onClick={async () => {
              if (pageInfo.hasNextPage) {
                setFetchMoreLoading(true);
                await fetchMore({ variables: { cursor: pageInfo.endCursor } });
                setFetchMoreLoading(false);
              }
            }}
            style={{
              display: data.ads.pageInfo.hasNextPage ? 'inherit' : 'none',
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
