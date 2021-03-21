import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import _ from 'lodash';

import { useCreateMutation, useUpdateMutation } from '../../../../apollo/mutation/ad';

import { Context } from '../../Context';

export default function TabsLocation({ setActiveStep, loading, setLoading }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [create, { status: createStatus }] = useCreateMutation(setLoading);
  const [update, { status: updateStatus }] = useUpdateMutation(setLoading);

  const context = useContext(Context);

  const _onHandlePublish = () => {
    if (_.isEmpty(context.title)) {
      enqueueSnackbar('Please enter a title for your ad', snackbarErrorConfig); // TODO: get from utils
      return setActiveStep(2);
    }

    if (_.isEmpty(context.price)) {
      enqueueSnackbar('Please enter a price for your ad', snackbarErrorConfig);
      return setActiveStep(2);
    }

    if (_.isEmpty(context.description)) {
      enqueueSnackbar('Please describe for your ad', snackbarErrorConfig);
      return setActiveStep(2);
    }

    if (_.isEmpty(context.photos)) {
      enqueueSnackbar('Please add photos for your ad', snackbarErrorConfig);
      return setActiveStep(2);
    }

    if (_.isEmpty(context.phone)) {
      enqueueSnackbar('Please enter your phone numbers for your ad', snackbarErrorConfig);
      return setActiveStep(2);
    }

    if (context.id) {
      update(context);
    } else {
      create(context);
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

const snackbarErrorConfig = {
  variant: 'error',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
};
