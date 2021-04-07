import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import { Link } from '../common';
import { Logo, PostButton } from '../ui';
import { User } from '../common';

import { useIsSign } from '../../service/amplify/auth';

export default function HomeHeader() {
  const classes = useStyles();

  const [sign] = useIsSign();

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Logo className={classes.logo} />

          <PostButton />

          {sign ? (
            <User />
          ) : (
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
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  logo: {
    cursor: 'pointer',
    marginRight: 'auto',
    width: 40,
    [theme.breakpoints.down('sm')]: {
      width: 30,
    },
  },
  sign_button: {
    fontWeight: 'bold',
    boxShadow: 'none',
    letterSpacing: 1.5,
  },
  button_label: {
    color: theme.palette.secondary.main,
  },
}));
