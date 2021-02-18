import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import { Link } from '../common';
import { Logo, PostButton } from '../ui';

export default function HomeHeader({}) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Logo className={classes.logo} />

          <Link href='/sign'>
            <Button
              size='large'
              variant='contained'
              color='primary'
              className={classes.sign_button}
              classes={{ label: classes.button_label }}
            >
              sign
            </Button>
          </Link>

          <Link href='/post'>
            <PostButton />
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  sign_button: {
    fontWeight: 'bold',
    boxShadow: 'none',
    letterSpacing: 1.5,
    marginRight: theme.spacing(3),
  },
  logo: {
    cursor: 'pointer',
    marginRight: 'auto',
    width: 35,
    [theme.breakpoints.down('sm')]: {
      width: 30,
    },
  },
  button_label: {
    color: theme.palette.secondary.main,
  },
}));
