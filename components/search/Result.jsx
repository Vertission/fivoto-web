import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';

import { CircularProgress } from '@material-ui/core';

import schema from '../../apollo/schema';
import { Ads } from '../ui';

export default function SearchResult() {
  const classes = useStyles();

  const { data, loading, refetch, error, fetchMore } = useQuery(
    schema.query.SEARCH,
    {
      variables: {
        offset: 0,
        limit: 20,
        query: null,
        category: {},
        location: {},
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (loading)
    return (
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    );

  const { ads, total } = data.search;
  return <Ads data={ads} />;
}

const useStyles = makeStyles((theme) => ({
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: `calc(100vh - ${theme.spacing(20)})`,
  },
}));
