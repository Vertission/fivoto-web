import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typograph, Box } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

export default function MeVerifyEmail({ email }) {
  const classes = useStyles();

  return <div className={classes.root}>{email}</div>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
