import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Ads } from '../ui';

export default function HomeLatestAds() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Ads />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
}));
