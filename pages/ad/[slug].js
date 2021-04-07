import React from 'react';
import { AdView } from '../../components/ad';

import { initializeApollo, addApolloState } from '../../apollo';
import schema from '../../apollo/schema';

import { AdBlockDetector } from '../../components/common';

export default function AdPage({ id }) {
  return (
    <React.Fragment>
      <AdBlockDetector />
      <AdView id={id} />
    </React.Fragment>
  );
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();

  const id = params.slug.split('-').reverse()[0];

  await apolloClient.query({
    query: schema.query.AD,
    variables: { id },
  });

  return addApolloState(apolloClient, {
    props: { id },
  });
}
