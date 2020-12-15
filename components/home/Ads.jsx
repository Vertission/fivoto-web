import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card } from '../ui';

export default function HomeLatestAds() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
}));
