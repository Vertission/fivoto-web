import { useState } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';

import { Logo, PostButton } from '../../../ui';
import { User } from '../../../common';

import { useIsSign } from '../../../../service/amplify/auth';

export default function AdViewHeader() {
  const classes = useStyles();

  const [sign] = useIsSign();

  return (
    <div className={classes.root}>
      <AppBar position='static' elevation={0}>
        <Toolbar>
          <Link href='/'>
            <Logo className={classes.logo} />
          </Link>

          {sign === false && <PostButton />}
          {sign === true && <User />}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
