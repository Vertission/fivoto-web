import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';

export default function AdCarousel({ photos }) {
  const classes = useStyles();

  return (
    <Carousel navButtonsAlwaysVisible={true} autoPlay={false} className={classes.root} indicators={true}>
      {photos.map((photo) => (
        <div key={photo} className={classes.imageContainer}>
          <img src={photo} className={classes.image} />
        </div>
      ))}
    </Carousel>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
  imageContainer: {
    height: 500,
    [theme.breakpoints.down('md')]: {
      maxHeight: 400,
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: 300,
    },
    [theme.breakpoints.down('xs')]: {
      maxHeight: 200,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
  },
}));
