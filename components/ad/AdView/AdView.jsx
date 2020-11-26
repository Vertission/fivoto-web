import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container, Grid, Paper, useMediaQuery } from "@material-ui/core";

import { Footer } from "../../common";
import { Carousel, Detail, Fields, Description, User, Header } from "./modules";

export default function AdAdView() {
  const classes = useStyles();
  const theme = useTheme();
  const matchDownXS = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      <Header />
      <Container className={classes.container}>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Carousel />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Detail />
            <Fields />
            {matchDownXS ? <Description /> : <User />}
          </Grid>
        </Grid>
        {matchDownXS ? <User /> : <Description />}
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
