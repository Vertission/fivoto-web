import React from 'react';
import { withSSRContext } from 'aws-amplify';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Hidden, Typography, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import { Tabs } from '../components/sign';
import { Link } from '../components/common';

export default function PageSign() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton className={classes.home_button} component={Link} href={`/`}>
        <HomeIcon fontSize='large' color='primary' />
      </IconButton>
      <Grid container>
        <Grid item xs={12} sm={6} className={classes.grid_1}>
          <Tabs />
        </Grid>
        <Hidden smDown>
          <Grid item sm={6} className={classes.grid_2}>
            <Typography className={classes.fivoto} variant='h1' color='secondary'>
              FIVOTO
            </Typography>
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    background: '#fff',
  },
  home_button: {
    position: 'absolute',
    margin: theme.spacing(3),
  },
  grid_1: {
    height: '100vh',
  },
  grid_2: {
    background: theme.palette.primary.main,
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fivoto: {
    fontWeight: 900,
  },
}));

export async function getServerSideProps({ req, res }) {
  const { Auth } = withSSRContext({ req });
  try {
    await Auth.currentAuthenticatedUser();
    res.writeHead(302, { Location: '/' });
    res.end();
  } catch (error) {}

  return { props: {} };
}
