import React from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, CircularProgress } from '@material-ui/core';

import { rules, snackbar } from '../../../../utils';

import { useQueryMe } from '../../../../apollo/query';
import { useChangeEmail } from '../../../../service/amplify/auth';

export default function MeProfilePasswordChange() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const [user, { loading: userLoading }] = useQueryMe();
  const [changeEmail, { loading: changeEmailLoading }] = useChangeEmail(
    (email) => {
      enqueueSnackbar('Email address updated successfully', snackbar.SUCCESS_BOTTOM_CENTER);
      enqueueSnackbar(`Email Confirmation code send to ${email}`, snackbar.WARN_TOP_CENTER);
      router.push('/me/verify-email');
    },
    () => {
      enqueueSnackbar('Oops! something went wrong while updating your email address', snackbar.ERROR_BOTTOM_CENTER);
    }
  );

  const { control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = ({ email }) => {
    changeEmail(email);
  };

  if (userLoading)
    return (
      <div className={classes.root_circular}>
        <CircularProgress />
      </div>
    );
  else
    return (
      <div className={classes.root}>
        <form className={classes.form}>
          {/* EMAIL ADDRESS  */}
          <Controller
            name='email'
            control={control}
            rules={rules.email}
            defaultValue={user.email}
            render={({ onChange, value }) => (
              <TextField
                label='Email Address'
                variant='outlined'
                className={classes.textField}
                name='email'
                fullWidth
                type='email'
                error={errors?.email}
                helperText={errors?.email?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Typography className={classes.message}>
            Please enter your new email address and submit to receive email confirmation code.
          </Typography>

          <Button
            variant='contained'
            color='primary'
            size='large'
            className={classes.submit}
            disabled={changeEmailLoading}
            onClick={handleSubmit(onSubmit)}
          >
            CHANGE EMAIL
          </Button>
        </form>
      </div>
    );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  root_circular: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: 500,
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  textField: {
    marginTop: theme.spacing(5),
  },
  message: {
    color: theme.palette.grey[500],
    marginTop: theme.spacing(5),
    textAlign: 'center',
  },
  submit: {
    marginTop: theme.spacing(10),
    alignSelf: 'flex-end',
  },
}));
