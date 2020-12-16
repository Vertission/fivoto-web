import React from 'react';
import { format } from 'timeago.js';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from '@material-ui/core';

import { Link } from '../../common';

export default function Ads({ data }) {
  const classes = useStyles();

  const childElements = data.map(
    ({ id, title, price, photos, location, createdAt }) => (
      <Card key={id} className={classes.card}>
        <CardActionArea className={classes.cardActionArea}>
          <CardMedia component='div' className={classes.cardMedia}>
            <img src={photos[0]} className={classes.img} />
          </CardMedia>
          <CardContent
            className={classes.cardContent}
            component={Link}
            href={`ad/${id}`}
            naked
          >
            <Typography>{title}</Typography>
            <Typography
              color='primary'
              variant='subtitle2'
              className={classes.cardPrice}
            >
              {price}
            </Typography>
            <div className={classes.contentBottom}>
              <Typography variant='caption' display='block' gutterBottom>
                {location.city}
              </Typography>
              <Typography variant='caption' display='block' gutterBottom>
                {format(createdAt)}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  );

  return <div className={classes.root}>{childElements}</div>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    width: `calc(25% - ${theme.spacing(5)})`,
    height: '250px',
    margin: theme.spacing(2.5),
    [theme.breakpoints.down('md')]: {
      width: `calc(33.33% - ${theme.spacing(4)})`,
      height: '250px',
      margin: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      width: `calc(50% - ${theme.spacing(2)})`,
      height: '250px',
      margin: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
      height: '100px',
      width: '100%',
    },
  },
  cardActionArea: {
    padding: theme.spacing(0.5),
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-around',
    },
  },
  cardMedia: {
    width: 'auto',
    height: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0.5),
    background: '#fafafa',
    [theme.breakpoints.down('xs')]: {
      width: '35%',
      height: '100%',
    },
  },
  img: {
    maxWidth: '100%',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  cardContent: {
    height: '40%',
    padding: theme.spacing(0.5),
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      height: '100%',
    },
  },
  contentBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardPrice: {
    marginBottom: 'auto',
  },
}));
