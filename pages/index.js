import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import { Header, Download, Category, Title, Search } from '../components/home';
import { Footer } from '../components/common';

export default function HomePage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header />
      <Container>
        <Search />
        <Category />
        <Download />
      </Container>
      <Footer />
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({}));
