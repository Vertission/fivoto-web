import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import { Header, Result } from '../components/search';
import { AdBlockDetector, Footer } from '../components/common';

export default function HomePage() {
  const classes = useStyles();

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(router.query?.query);

  return (
    <React.Fragment>
      <AdBlockDetector />
      <Header setSearchQuery={setSearchQuery} />
      <Container>
        <Result searchQuery={searchQuery} />
      </Container>
      <Footer />
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({}));
