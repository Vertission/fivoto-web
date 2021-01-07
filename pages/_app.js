import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { ApolloProvider } from '@apollo/client';
import Amplify from 'aws-amplify';

import { useApollo } from '../apollo';

import theme from '../assets/theme';
import { Head } from '../components/common';
import { Dialog } from '../components/ui';

import amplifyConfig from '../service/amplify';
console.log('🚀 ~ file: _app.js ~ line 15 ~ amplifyConfig', amplifyConfig);

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps);

  Amplify.configure({
    ...amplifyConfig,
    ssr: true,
  });

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <Dialog.DialogProvider>
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </Dialog.DialogProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}
