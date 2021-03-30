import React from 'react';
import { Container } from '@material-ui/core';

import { Header, Download, Category, Title, Search } from '../components/home';
import { Footer } from '../components/common';

import { initializeApollo, addApolloState } from '../apollo';
import schema from '../apollo/schema';

export default function HomePage() {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <Search />
        <Category />
        {/* <Download /> */}
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: schema.query.CATEGORY,
  });

  await apolloClient.query({
    query: schema.query.LOCATION,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
