import React, { useState } from 'react';
import { withSSRContext } from 'aws-amplify';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import { Header } from '../../components/ui';

import { VerifyEmail } from '../../components/me/verifyEmail';

export default function PageMeVerifyEmail({ email }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header title='verify email address' />
      <Container className={classes.root}>
        <VerifyEmail email={email} />
      </Container>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export async function getServerSideProps({ req, res }) {
  const { Auth } = withSSRContext({ req });
  try {
    const user = await Auth.currentAuthenticatedUser();
    if (user.attributes.email_verified) {
      return {
        redirect: {
          destination: '/me',
          permanent: false,
        },
      };
    } else {
      return { props: { email: user.attributes.email } };
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/sign',
        permanent: false,
      },
    };
  }
}
