import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";

export default function AdCarousel({ photos }) {
  const classes = useStyles();

  photos = [
    "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c3BsYXNofGVufDB8fDB8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1530032582480-edd739014c39?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c3BsYXNofGVufDB8fDB8&auto=format&fit=crop&w=500&q=60",
    "https://i.ikman-st.com/5643eaba-3a9f-40e2-b630-f90748665f83/620/466/fitted.jpg",
    "https://i.ikman-st.com/dbc06f6a-a182-4c3c-ae7d-f7f04aa438d4/620/466/fitted.jpg",
  ];

  return (
    <Carousel
      navButtonsAlwaysVisible={true}
      autoPlay={false}
      className={classes.root}
      indicators={true}
    >
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
    [theme.breakpoints.down("md")]: {
      maxHeight: 400,
    },
    [theme.breakpoints.down("sm")]: {
      maxHeight: 300,
    },
    [theme.breakpoints.down("xs")]: {
      maxHeight: 200,
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
  },
}));
