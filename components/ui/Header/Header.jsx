import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import { Link } from '../../common';
import Logo from '../Logo';

export default function UIHeader({ title, logo }) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          {logo ? (
            <Link href='/'>
              <Logo className={classes.logo} />
            </Link>
          ) : null}

          <Typography variant='h6' className={classes.title}>
            {title}
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
  logo: {
    cursor: 'pointer',
    marginRight: 'auto',
    width: 40,
    [theme.breakpoints.down('sm')]: {
      width: 30,
    },
  },
}));
