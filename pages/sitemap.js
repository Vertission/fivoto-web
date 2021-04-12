import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

import { Link } from '../components/common';

import { initializeApollo, addApolloState } from '../apollo';
import schema from '../apollo/schema';

export default function PageSitemap({ category, location }) {
  const classes = useStyles();

  return (
    <Container>
      <Typography className={classes.root_title} variant='h6'>
        Categories
      </Typography>
      <div className={classes.box_root}>
        {category.map(({ category, items }) => (
          <div className={classes.box_container}>
            <Typography
              component={Link}
              href={`/search/sri-lanka/${category.split(' ').join('-')}`}
              className={classes.box_title}
            >
              {category}
            </Typography>
            {items.map((item) => (
              <Typography
                component={Link}
                href={`/search/sri-lanka/${item.split(' ').join('-')}`}
                className={classes.box_item}
              >
                {item}
              </Typography>
            ))}
          </div>
        ))}
      </div>

      <Typography className={classes.root_title} variant='h6'>
        Locations
      </Typography>
      <div className={classes.box_root}>
        {location.map(({ district, cities }) => (
          <div className={classes.box_container}>
            <Typography
              component={Link}
              href={`/search/${district.split(' ').join('-').toLowerCase()}`}
              className={classes.box_title}
            >
              {district}
            </Typography>
            {cities.map((city) => (
              <Typography
                component={Link}
                href={`/search/${city.split(' ').join('-').toLowerCase()}`}
                className={classes.box_item}
              >
                {city}
              </Typography>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root_title: {
    fontWeight: 900,
    margin: theme.spacing(3),
  },
  box_root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  box_container: {
    width: '25%',
    padding: theme.spacing(5),
  },
  box_title: {
    fontWeight: 700,
    textTransform: 'capitalize',
    '&:hover': {
      color: `${theme.palette.primary.main} !important`,
      fontWeight: 900,
    },
  },
  box_item: {
    textTransform: 'capitalize',
    display: 'block',
    '&:hover': {
      color: `${theme.palette.primary.main} !important`,
      fontWeight: 700,
    },
  },
}));

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const category = await apolloClient.query({
    query: schema.query.CATEGORY,
  });

  const location = await apolloClient.query({
    query: schema.query.LOCATION,
  });

  return addApolloState(apolloClient, {
    props: {
      category: category.data.category,
      location: location.data.location,
    },
    revalidate: 1,
  });
}
