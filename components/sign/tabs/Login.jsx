import React from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { TextField, InputAdornment, Button, LinearProgress, Typography } from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';

import { PasswordField } from '../../ui';
import { rules, snackbar } from '../../../utils/index';

import { useSignIn } from '../../../service/amplify/auth';

const SignTabsLogin = ({ setTab, email, setEmail }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  });

  const [signIn, { loading }] = useSignIn(
    () => {
      enqueueSnackbar('Sign In successfully', snackbar.SUCCESS_BOTTOM_LEFT);
      router.push('/');
    },
    () => {},
    { setTab }
  );

  const onSubmit = ({ email, password }) => {
    signIn(email, password);
    setEmail(email);
  };

  return (
    <React.Fragment>
      {loading && <LinearProgress classes={{ root: classes.linearProgressRoot }} />}
      <div className={classes.root}>
        <form className={classes.container}>
          <Typography variant='h6'>Welcome Back!</Typography>
          <div className={classes.textField_email}>
            <Controller
              name='email'
              control={control}
              defaultValue={email}
              rules={rules.email}
              render={({ onChange, value }) => (
                <TextField
                  size='small'
                  variant='outlined'
                  name='email'
                  fullWidth
                  label='Email Address'
                  type='email'
                  error={errors.email}
                  helperText={errors.email?.message}
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
              rules={rules.oldPassword}
              render={({ onChange, value }) => (
                <PasswordField
                  size='small'
                  error={errors.password}
                  helperText={errors.password?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>

          <Typography variant='body2' color='primary' className={classes.forgotPassword} onClick={() => setTab(1)}>
            Forgot Password?
          </Typography>

          <div className={classes.button_group}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
            >
              login
            </Button>
            <Button
              variant='outlined'
              color='primary'
              className={classes.button}
              classes={{ label: classes.button_label }}
              onClick={() => setTab(3)}
            >
              Register account
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
  textField_email: {
    margin: theme.spacing(6, 0),
  },
  textField_password: {
    margin: theme.spacing(2, 0),
  },
  textField_helperText: {
    position: 'absolute',
    top: '90%',
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
