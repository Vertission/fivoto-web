import React, { useState, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  useMediaQuery,
  CircularProgress,
  Paper,
  CardActionArea,
  Typography,
  Button,
  SwipeableDrawer,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import _ from 'lodash';

import { useQuery } from '@apollo/client';
import schema from '../../../../apollo/schema';

import { dispatch, Context } from '../../Context';

export default function TabsLocation({ setActiveStep }) {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const { title, price, description, photos, phone } = useContext(Context);

  const _onHandlePublish = () => {
    if (_.isEmpty(title)) {
      enqueueSnackbar('Please enter a title for your ad', snackbarErrorConfig);
      return setActiveStep(2);
    }

    if (_.isEmpty(price)) {
      enqueueSnackbar('Please enter a price for your ad', snackbarErrorConfig);
      return setActiveStep(2);
    }

    if (_.isEmpty(description)) {
      enqueueSnackbar('Please describe for your ad', snackbarErrorConfig);
      return setActiveStep(2);
    }

    if (_.isEmpty(photos)) {
      enqueueSnackbar('Please add photos for your ad', snackbarErrorConfig);
      return setActiveStep(2);
    }

    if (_.isEmpty(phone)) {
      enqueueSnackbar('Please enter your phone numbers for your ad', snackbarErrorConfig);
      return setActiveStep(2);
    }
  };

  return (
    <React.Fragment>
      <Container className={classes.root}>
        <Button onClick={_onHandlePublish} variant='contained' color='primary' size='large'>
          Publish Ad
        </Button>
      </Container>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
}));

const snackbarErrorConfig = {
  variant: 'error',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
};
