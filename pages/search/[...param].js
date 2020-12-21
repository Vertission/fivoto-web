import React, { Component } from 'react';

import { Container } from '@material-ui/core';

import { Header, Result, Context } from '../../components/search';
import { AdBlockDetector, Footer } from '../../components/common';

import schema from '../../apollo/schema';
import { initializeApollo, addApolloState } from '../../apollo';

export default class Ads extends Component {
  constructor(props) {
    super(props);

    const { query, category } = props;

    this.state = {
      query: query.query,
    };

    Context.dispatch('SET_CATEGORY', category);
  }

  render() {
    return (
      <React.Fragment>
        <Context.Provider>
          <AdBlockDetector />
          <Header state={this.state} />
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
  const apolloClient = initializeApollo();

  const categories = await apolloClient.query({
    query: schema.query.CATEGORY,
  });

  let selectedCategory = { field: null, item: null };

  if (query.param[1]) {
    const queryParam = query.param[1].replace(/-/gi, ' ');

    categories.data.category.map((category) => {
      if (queryParam === category.category) {
        selectedCategory.field = category.category;
      } else {
        category.items.map((item) => {
          if (queryParam === item) {
            selectedCategory.field = category.category;
            selectedCategory.item = item;
          }
        });
      }
    });
  }

  await apolloClient.query({
    query: schema.query.SEARCH,
    variables: {
      first: 20,
      filter: {
        query: query?.query,
        location: {
          district: null,
          city: null,
        },
        category: selectedCategory,
      },
    },
  });

  return {
    props: { query, category: selectedCategory }, // will be passed to the page component as props
  };
}
