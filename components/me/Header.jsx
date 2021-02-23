import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import { Link } from '../common';

export default function MeHeader({}) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton component={Link} href={`/`}>
            <HomeIcon fontSize='large' />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));
