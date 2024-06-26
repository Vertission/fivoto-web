import React, { useContext } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Button, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import _ from 'lodash';

import { useCreateMutation, useUpdateMutation } from '../../../../apollo/mutation/ad';

import { Context } from '../../Context';

import { snackbar } from '../../../../utils';

export default function TabsLocation({ setActiveStep, loading, setLoading }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [create, { status: createStatus }] = useCreateMutation(setLoading);
  const [update, { status: updateStatus }] = useUpdateMutation(setLoading);

  const context = useContext(Context);

  const _onHandlePublish = async () => {
    if (_.isEmpty(context.title)) {
      enqueueSnackbar('Please enter a title for your ad', snackbar.ERROR_BOTTOM_CENTER);
      return setActiveStep(2);
    }

    if (_.isEmpty(context.price)) {
      enqueueSnackbar('Please enter a price for your ad', snackbar.ERROR_BOTTOM_CENTER);
      return setActiveStep(2);
    }

    if (_.isEmpty(context.description)) {
      enqueueSnackbar('Please describe for your ad', snackbar.ERROR_BOTTOM_CENTER);
      return setActiveStep(2);
    }

    if (_.isEmpty(context.photos)) {
      enqueueSnackbar('Please add photos for your ad', snackbar.ERROR_BOTTOM_CENTER);
      return setActiveStep(2);
    }

    if (_.isEmpty(context.phone)) {
      enqueueSnackbar('Please enter your phone numbers for your ad', snackbar.ERROR_BOTTOM_CENTER);
      return setActiveStep(2);
    }

    try {
      const url = `https://sentry-test90426-dev.s3.ap-south-1.amazonaws.com/public/ads/download.png?=${new Date().getTime()}`;

      await axios.get(url);
      if (context.id) {
        update(context);
      } else {
        create(context);
      }
    } catch (error) {
      if (context.id) {
        enqueueSnackbar(`Please disable your ad blocker to update ad.`, snackbar.ERROR_TOP_CENTER);
      } else {
        enqueueSnackbar(`Please disable your ad blocker to post ad.`, snackbar.ERROR_TOP_CENTER);
      }
    }
  };

  return (
    <React.Fragment>
      <Container className={classes.root}>
        <Button
          onClick={_onHandlePublish}
          disabled={loading}
          className={classes.button}
          classes={{ label: classes.button_label }}
          variant='contained'
          color='primary'
          size='large'
        >
          {context.id ? 'Update Ad' : 'Publish Ad'}
        </Button>
      </Container>

      <Typography className={classes.status}>{context.id ? updateStatus : createStatus}</Typography>
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
  button: {
    height: 60,
    width: 200,
  },
  button_label: {
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.h6.fontWeight,
    letterSpacing: theme.typography.h6.letterSpacing,
    fontSize: theme.typography.h6.fontSize,
  },
  status: {
    textAlign: 'center',
    marginTop: theme.spacing(5),
    textTransform: 'uppercase',
    fontSize: theme.typography.caption.fontSize,
  },
}));
