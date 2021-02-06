import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  InputAdornment,
  Button,
  Typography,
  LinearProgress,
} from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';

import { rules } from '../../../utils/index';

import { PasswordField } from '../../ui';

import { useResetPassword } from '../../../service/amplify/auth';

const SignTabsLogin = ({ setTab, email }) => {
  const classes = useStyles();

  const { control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  });

  const [resetPassword, { loading }] = useResetPassword(setTab);

  const onSubmit = ({ code, password }) => {
    resetPassword(email, code, password);
  };

  return (
    <React.Fragment>
      {loading && (
        <LinearProgress classes={{ root: classes.linearProgressRoot }} />
      )}
      <div className={classes.root}>
        <form className={classes.container}>
          <Typography variant='h6'>Reset Password</Typography>
          <Typography variant='body2' className={classes.description}>
            Password reset verification code send to mohammedusama@gamil.com,
            Please enter the verification code and a new strong password.
          </Typography>
          <div className={classes.textField_email}>
            <Controller
              name='code'
              control={control}
              defaultValue=''
              rules={rules.verificationCode}
              render={({ onChange, value }) => (
                <TextField
                  size='small'
                  variant='outlined'
                  name='code'
                  fullWidth
                  label='Verification Code'
                  type='code'
                  error={errors?.code?.message}
                  helperText={errors?.code?.message}
                  onChange={onChange}
                  value={value}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
          <div className={classes.textField_password}>
            <Controller
              name='password'
              control={control}
              defaultValue=''
              rules={rules.newPassword}
              render={({ onChange, value }) => (
                <PasswordField
                  error={errors?.password?.message}
                  helperText={errors?.password?.message}
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
              disabled={loading}
              className={classes.button}
              onClick={handleSubmit(onSubmit)}
            >
              reset password
            </Button>
            <Button
              variant='outlined'
              color='primary'
              className={classes.button}
              classes={{ label: classes.button_label }}
              onClick={() => setTab(1)}
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
