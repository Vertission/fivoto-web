import React, { useState } from 'react';
import { withSSRContext } from 'aws-amplify';

import { Header, Tab, Context } from '../components/post';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Context.Provider>
      <React.Fragment>
        <Header activeStep={activeStep} setActiveStep={setActiveStep} loading={loading} />
        <Tab value={activeStep} setActiveStep={setActiveStep} loading={loading} setLoading={setLoading} />
      </React.Fragment>
    </Context.Provider>
  );
}

export async function getServerSideProps({ req, res }) {
  const { Auth } = withSSRContext({ req });
  try {
    const user = await Auth.currentAuthenticatedUser();
    if (!user.attributes.email_verified) {
      return {
        redirect: {
          destination: '/me/verify-email',
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/sign',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
