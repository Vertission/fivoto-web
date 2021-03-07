import React from 'react';
import { withSSRContext } from 'aws-amplify';

export default function MeProfilePage() {
  return <React.Fragment></React.Fragment>;
}

export async function getServerSideProps({ req, res }) {
  const { Auth } = withSSRContext({ req });
  try {
    await Auth.currentAuthenticatedUser();
  } catch (error) {
    res.writeHead(302, { Location: '/sign' });
    res.end();
  }

  return { props: {} };
}
