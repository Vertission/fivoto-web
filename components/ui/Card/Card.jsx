import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
} from '@material-ui/core';

export default function () {
  const classes = useStyles();

  const images = [
    'https://images.unsplash.com/photo-1578496479531-32e296d5c6e1',
    'https://picsum.photos/seed/picsum/536/354',
    'https://images.unsplash.com/photo-1582560474992-385ebb9b29a4',
    'https://images.unsplash.com/photo-1576086265779-619d2f54d96b',
    'https://images.unsplash.com/photo-1576086265779-619d2f54d96b',
  ];

  const childElements = images.map((element) => (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardActionArea}>
        <CardMedia component='div' className={classes.cardMedia}>
          <img src={element} className={classes.img} />
        </CardMedia>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.cardTitle}>
            Portable compact blender
          </Typography>
          <Typography>Rs: 38,600</Typography>
          <div className={classes.contentBottom}>
            <Typography variant='caption' display='block' gutterBottom>
              kandy, akurana
            </Typography>
            <Typography variant='caption' display='block' gutterBottom>
              38 mins ago
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  ));

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
  },
  cardContent: {
    height: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(0.5),
    [theme.breakpoints.up('xs')]: {
      height: '100%',
    },
  },
  contentBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardTitle: {
    [theme.breakpoints.up('xs')]: {
      marginBottom: 'auto',
    },
  },
}));
