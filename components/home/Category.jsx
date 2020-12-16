import React from 'react';
import { useQuery } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, CircularProgress } from '@material-ui/core';

import schema from '../../apollo/schema';
import { initializeApollo } from '../../apollo';

export default function HomeCategory() {
  const classes = useStyles();

  const { data } = useQuery(schema.query.CATEGORY, {
    onError(error) {
      console.log('onError -> error', error);
    },
  });

  console.log(data);

  return (
    <div className={[classes.root, classes.root_progress]}>
      <CircularProgress />
    </div>
  );
  return (
    <div className={classes.root}>
      <Paper className={classes.category}>
        <img
          className={classes.category_image}
          src='https://fivoto-srilanka101812-prod.s3.ap-south-1.amazonaws.com/assets/category/device.png'
        />
        <Typography>Device</Typography>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
  },
  root_progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    padding: theme.spacing(2),
    width: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  category_image: {
    width: 80,
  },
}));
