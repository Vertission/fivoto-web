import React, { Component } from 'react';

import { Container } from '@material-ui/core';

import { Header, Result, Context } from '../../components/ads';
import { AdBlockDetector, Footer } from '../../components/common';

export default class Ads extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: props.query.query,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Context.Provider>
          <AdBlockDetector />
          <Header state={this.state} setState={this.setState} />
          <Container>
            <Result />
          </Container>
          <Footer />
        </Context.Provider>
      </React.Fragment>
    );
  }
}

export async function getServerSideProps({ query }) {
  return {
    props: { query }, // will be passed to the page component as props
  };
}
