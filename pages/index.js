import React from 'react';
import { Container } from '@material-ui/core';

import { Header, Download, Category, Title, Search } from '../components/home';
import { Footer } from '../components/common';

import { initializeApollo, addApolloState } from '../apollo';
import schema from '../apollo/schema';

import { AdBlockDetector } from '../components/common';

export default function HomePage() {
  console.log(`
//....................................................................
//.FFFFFFFFFFF.III.VVVV....VVVV...OOOOOOOO...TTTTTTTTTTT...OOOOOOOO....
//.FFFFFFFFFFF.III.VVVV....VVVV..OOOOOOOOOO..TTTTTTTTTTT.OOOOOOOOOOO...
//.FFFFFFFFFFF.III.VVVV....VVVV.OOOOOOOOOOOO.TTTTTTTTTTT.OOOOOOOOOOOO..
//.FFF.........III..VVVV...VVV..OOOO....OOOO.....TTT....OOOOO....OOOOO..
//.FFF.........III..VVVV..VVVV.OOOO......OOOO....TTT....OOOO.....OOOOO..
//.FFF.........III..VVVV..VVVV.OOOO......OOOO....TTT....OOOO......OOOO..
//.FFFFFFFFFFF.III...VVV..VVV..OOOO......OOOO....TTT....OOOO......OOOO..
//.FFFFFFFFFFF.III...VVVVVVVV..OOOO......OOOO....TTT....OOOO......OOOO..
//.FFFFFFFFFFF.III...VVVVVVVV..OOOO......OOOO....TTT....OOOO.....OOOOO..
//.FFF.........III....VVVVVV....OOOO....OOOO.....TTT....OOOOO....OOOOO..
//.FFF.........III....VVVVVV....OOOOOOOOOOOO.....TTT.....OOOOOOOOOOOO..
//.FFF.........III.....VVVV......OOOOOOOOOO......TTT......OOOOOOOOOO...
//.FFF.........III.....VVVV.......OOOOOOOO.......TTT.......OOOOOOOO....
//....................................................................
`);

  return (
    <React.Fragment>
      <AdBlockDetector />
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
