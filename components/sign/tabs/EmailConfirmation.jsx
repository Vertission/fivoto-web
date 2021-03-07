import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, LinearProgress } from '@material-ui/core';

import { useConfirmSign, useSendConfirmationCode } from '../../../service/amplify/auth';

import { rules } from '../../../utils/index';

const SignTabsLogin = ({ setTab, email }) => {
  const classes = useStyles();

  const { control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  });

  const [confirmSign, { loading }] = useConfirmSign(setTab);

  const [sendConfirmationCode, { loading: sendConfirmationCodeLoading }] = useSendConfirmationCode(email);

  const onSubmit = ({ code }) => {
    confirmSign(email, code);
  };

  return (
    <React.Fragment>
      {loading || (sendConfirmationCodeLoading && <LinearProgress classes={{ root: classes.linearProgressRoot }} />)}
      <div className={classes.root}>
        <form className={classes.container}>
          <Typography variant='h6'>Email Confirmation</Typography>
          <Typography variant='body2' className={classes.description}>
            Please enter the confirmation code we send to your email address {email}
          </Typography>
          <div className={classes.textField_email}>
            <Controller
              name='code'
              control={control}
              rules={rules.confirmationCode}
              defaultValue=''
              render={({ onChange, value }) => (
                <TextField
                  size='small'
                  variant='outlined'
                  name='code'
                  fullWidth
                  label='Verification Code'
                  type='code'
                  type='number'
                  error={errors.code}
                  helperText={errors?.code?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>

          <div className={classes.button_group}>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
            >
              confirm
            </Button>
            <Button
              variant='outlined'
              color='primary'
              className={classes.button}
              disabled={sendConfirmationCodeLoading}
              classes={{ label: classes.button_label }}
              onClick={() => sendConfirmationCode(email)}
            >
              resend code
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
  },
  linearProgressRoot: {
    position: 'absolute',
    width: '50%',
  },
  container: {
    width: '65%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  description: {
    color: theme.palette.secondary.dark,
  },
  textField_email: {
    margin: theme.spacing(6, 0),
  },
  textField_password: {
    margin: theme.spacing(2, 0),
  },
  forgotPassword: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  button_group: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
  },
  button_label: {
    color: theme.palette.primary.main,
  },
}));

export default SignTabsLogin;
