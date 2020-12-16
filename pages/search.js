import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import { Header, Result } from '../components/search';
import { AdBlockDetector } from '../components/common';

export default function HomePage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AdBlockDetector />
      <Header />
      <Container>
        <Result />
      </Container>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({}));
