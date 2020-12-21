import React from 'react';
import { useQuery } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import { CardActionArea, Typography } from '@material-ui/core';

import { Link } from '../common';

import schema from '../../apollo/schema';

export default function HomeCategory() {
  const classes = useStyles();

  const { data } = useQuery(schema.query.CATEGORY, {
    onError(error) {
      console.log('onError -> error', error);
    },
  });

  return (
    <div className={classes.root}>
      {data?.category.map(({ category, image }) => (
        <div className={classes.category}>
          <CardActionArea
            style={{ borderRadius: 100 }}
            className={classes.category}
            component={Link}
            href={`/search/sri-lanka/${category
              .split(' ')
              .join('-')
              .toLowerCase()}`}
          >
            <img className={classes.category_image} src={image} />
          </CardActionArea>
          <Typography
            variant='caption'
            align='center'
            className={classes.title}
          >
            {category}
          </Typography>
        </div>
      ))}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      flexWrap: 'initial',
      overflow: 'scroll',
    },
  },
  category: {
    padding: theme.spacing(2),
    width: 120,
    [theme.breakpoints.down('md')]: {
      width: 100,
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  category_image: {
    width: 50,
  },
  title: {
    textTransform: 'capitalize',
  },
}));
