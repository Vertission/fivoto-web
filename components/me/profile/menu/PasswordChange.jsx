import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';

import { PasswordField, Dialog, Modal } from '../../../ui';

import { rules, snackbar } from '../../../../utils';

import { useChangePassword } from '../../../../service/amplify/auth';

export default function MeProfilePasswordChange() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, closeDialog] = Dialog.useDialog();

  const { control, handleSubmit, errors, reset } = useForm({
    mode: 'onBlur',
  });

  const [changePassword, { loading }] = useChangePassword(
    () => {
      enqueueSnackbar('Password changed successfully', snackbar.SUCCESS_BOTTOM_CENTER);
    },
    () => {
      enqueueSnackbar('Oops! Something went wrong while changing your password', snackbar.ERROR_BOTTOM_CENTER);
    }
  );

  const onSubmit = ({ password, new_password }) => {
    changePassword(password, new_password);
    reset();
  };

  const _handleForgotPassword = () => {
    return openDialog({
      children: (
        <Modal
          title='Forgot Password?'
          description='If you have forgot your password you can reset your password after signing out.'
          closeTitle='close'
          handleClose={closeDialog}
          actions={[
            {
              title: 'sign out',
              onClick: () => {},
            },
          ]}
        />
      ),
    });
  };

  return (
    <div className={classes.root}>
      <form className={classes.form}>
        {/* CURRENT PASSWORD  */}
        <Controller
          name='password'
          control={control}
          rules={rules.currentPassword}
          defaultValue=''
          render={({ onChange, value }) => (
            <TextField
              label='Current Password'
              variant='outlined'
              className={classes.textField}
              name='password'
              fullWidth
              type='password'
              error={errors?.password}
              helperText={errors?.password?.message}
              onChange={onChange}
              value={value}
            />
          )}
        />

        {/* NEW PASSWORD  */}
        <Controller
          name='new_password'
          control={control}
          defaultValue=''
          rules={rules.newPassword}
          render={({ onChange, value }) => (
            <PasswordField
              className={classes.textField}
              error={errors?.new_password}
              helperText={errors?.new_password?.message}
              onChange={onChange}
              value={value}
            />
          )}
        />

        <Typography className={classes.forgot_password} onClick={_handleForgotPassword}>
          forgot password?
        </Typography>

        <Button
          variant='contained'
          color='primary'
          size='large'
          className={classes.save}
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
        >
          CHANGE PASSWORD
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
  forgot_password: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    marginTop: theme.spacing(3),
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  save: {
    marginTop: theme.spacing(10),
    alignSelf: 'flex-end',
  },
}));
