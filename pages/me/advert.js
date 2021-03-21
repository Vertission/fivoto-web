import React from 'react';
import { withSSRContext } from 'aws-amplify';

import { Header, AdsPublished } from '../../components/me/advert';

export default function MeAvert() {
  return (
    <React.Fragment>
      <Header />
      <AdsPublished />
    </React.Fragment>
  );
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
