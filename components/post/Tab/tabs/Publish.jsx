import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import _ from 'lodash';

import { useCreateMutation } from '../../../../apollo/mutation/ad';

import { Context } from '../../Context';

export default function TabsLocation({ setActiveStep, loading, setLoading }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [create, { status }] = useCreateMutation(setLoading);

  const data = useContext(Context);

  const _onHandlePublish = () => {
    if (_.isEmpty(data.title)) {
      enqueueSnackbar('Please enter a title for your ad', snackbarErrorConfig);
      return setActiveStep(2);
    }

    if (_.isEmpty(data.price)) {
      enqueueSnackbar('Please enter a price for your ad', snackbarErrorConfig);
      return setActiveStep(2);
    }

    if (_.isEmpty(data.description)) {
      enqueueSnackbar('Please describe for your ad', snackbarErrorConfig);
      return setActiveStep(2);
    }

    if (_.isEmpty(data.photos)) {
      enqueueSnackbar('Please add photos for your ad', snackbarErrorConfig);
      return setActiveStep(2);
    }

    if (_.isEmpty(data.phone)) {
      enqueueSnackbar('Please enter your phone numbers for your ad', snackbarErrorConfig);
      return setActiveStep(2);
    }

    create(data);
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
          Publish Ad
        </Button>
      </Container>

      <Typography className={classes.status}>{status}</Typography>
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
