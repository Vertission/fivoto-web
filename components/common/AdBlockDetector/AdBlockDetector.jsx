import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button, Paper, Typography } from '@material-ui/core';

export default function CommonAdBlockDetector() {
  const classes = useStyles();
  const [adBlocker, setAdBlocker] = useState(false);

  useEffect(() => {
    const url = `https://sentry-test90426-dev.s3.ap-south-1.amazonaws.com/public/ads/download.png?=${new Date().getTime()}`;
    const asyncAxios = async () => {
      try {
        await axios.get(url);
        setAdBlocker(false);
      } catch (error) {
        setAdBlocker(true);
      }
    };

    asyncAxios();
  }, []);

  if (adBlocker)
    return (
      <Container>
        <Paper square className={classes.paper}>
          <Typography variant='button' color='error' gutterBottom>
            Oops! Ad blocker detected
          </Typography>
          <Typography variant='body2'>
            While Ad blocker is enabled you are not able to view photos, Because photos URL contains word <b>ads</b>.
            Disable the Ad blocker and click reload to view photos else continue without disabling.
          </Typography>
          <Button onClick={() => window.location.reload()} color='primary'>
            reload
          </Button>
        </Paper>
      </Container>
    );
  else return null;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));
