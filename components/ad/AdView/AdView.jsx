import React from 'react';
import _ from 'lodash';
import { NextSeo } from 'next-seo';
import { useQuery } from '@apollo/client';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Grid, Typography, useMediaQuery } from '@material-ui/core';

import schema from '../../../apollo/schema';

import { Footer } from '../../common';
import { Carousel, Detail, Fields, Description, User, Header } from './modules';

export default function AdAdView({ id }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchDownXS = useMediaQuery(theme.breakpoints.down('md'));

  const { data } = useQuery(schema.query.AD, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
    onError(error) {
      console.log('onError -> error', error);
    },
  });

  if (!data?.ad?.type)
    return (
      <React.Fragment>
        <Header />
        <Container>
          <Typography align='center'>ad not found</Typography>
        </Container>
      </React.Fragment>
    );

  let {
    title,
    description,
    price,
    photos,
    location,
    createdAt,
    updatedAt,
    expireAt,
    fields,
    user,
    phone,
  } = data.ad;

  photos = _.uniq(photos);

  return (
    <React.Fragment>
      <NextSeo
        title={title}
        description={_.truncate(`<b>${price}</b> ${description}`, {
          length: 165,
        })}
        openGraph={{
          type: 'article',
          url: `lk.fivoto.com/ad/${id}`,
          title,
          description: _.truncate(`${price} | ${description}`, {
            length: 165,
          }),
          images: [
            {
              url: photos[0],
              alt: title,
            },
          ],
          article: {
            publishedTime: createdAt,
            modifiedTime: updatedAt,
            expirationTime: expireAt,
          },
        }}
      />
      <Header />
      <Container className={classes.container}>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Carousel photos={photos} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Detail
              location={location}
              createdAt={createdAt}
              title={title}
              price={price}
              negotiable={fields?.negotiable}
            />
            <Fields fields={fields} />
            {matchDownXS ? (
              <Description description={description} />
            ) : (
              <User user={user} phone={phone} />
            )}
          </Grid>
        </Grid>
        {matchDownXS ? (
          <User user={user} phone={phone} />
        ) : (
          <Description description={description} />
        )}
      </Container>
      <Footer />
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(5),
  },
}));
