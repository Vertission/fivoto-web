import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import Menu from './Menu';

export default function Me() {
  const classes = useStyles();

  return (
    <React.Fragment>
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
