import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import { Link } from '../../common';

export default function MeProfileHeader({ menu }) {
  const classes = useStyles();

  const _getHederTitle = (key) => {
    switch (key) {
      case '#edit-profile':
        return 'Edit Profile';
      case '#email-change':
        return 'Change Email';
      case '#password-change':
        return 'Change Password';
      case '#settings':
        return 'Settings';
      default:
        return 'Page Not Found';
    }
  };

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            {_getHederTitle(menu)}
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
  title: {
    flexGrow: 1,
    textTransform: 'capitalize',
  },
}));
