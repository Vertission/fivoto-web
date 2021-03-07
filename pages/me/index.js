import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import { Menu, Header } from '../../components/me/profile';

export default function Me() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header />
      <Container className={classes.root}>
        <Menu />
        <p>profile here</p>
      </Container>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
}));