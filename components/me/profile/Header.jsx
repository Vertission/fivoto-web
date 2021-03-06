import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import { Link } from '../../common';

export default function MeProfileHeader({ menu }) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            {menu.split('_').join(' ')}
          </Typography>

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
  title: {
    flexGrow: 1,
    textTransform: 'capitalize',
  },
}));
