import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import { Header, Result, Context } from '../../components/search';
import { AdBlockDetector, Footer } from '../../components/common';

export default function HomePage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Context.Provider>
        <AdBlockDetector />
        <Header />
        <Container>
          <Result />
        </Container>
        <Footer />
      </Context.Provider>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({}));
