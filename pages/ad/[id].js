import { AdView } from "../../components/ad";

import { initializeApollo, addApolloState } from "../../apollo";
import schema from "../../apollo/schema";

export default function AdPage({ id }) {
  return <AdView id={id} />;
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: schema.query.AD,
    variables: { id: params.id },
  });

  return addApolloState(apolloClient, {
    props: { id: params.id },
  });
}
