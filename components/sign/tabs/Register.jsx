import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  InputAdornment,
  Typography,
  Button,
  LinearProgress,
} from '@material-ui/core';
// import LoadingButton from '@material-ui/lab/LoadingButton';

import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { PasswordField } from '../../ui';
import { rules } from '../../../utils/index';

import { useSignUp } from '../../../service/amplify/auth';

const SignTabsRegister = ({ setTab, setEmail }) => {
  const classes = useStyles();

  const { control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  });

  const [signUp, { loading }] = useSignUp(setTab);

  const onSubmit = ({ name, email, password }) => {
    signUp(email, password, name);
    setEmail(email);
  };

  return (
    <React.Fragment>
      {loading && (
        <LinearProgress classes={{ root: classes.linearProgressRoot }} />
      )}
      <div className={classes.root}>
        <form className={classes.container}>
          <Typography variant='h6'>Register An Account</Typography>
          <div className={classes.textField_name}>
            <Controller
              name='name'
              control={control}
              rules={rules.name}
              defaultValue=''
              render={({ onChange, value }) => (
                <TextField
                  size='small'
                  variant='outlined'
                  name='name'
                  fullWidth
                  label='Name'
                  type='name'
                  error={errors?.name?.message}
                  helperText={errors?.name?.message}
                  onChange={onChange}
                  value={value}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
          <div className={classes.textField_email}>
            <Controller
              name='email'
              control={control}
              defaultValue=''
              rules={rules.email}
              render={({ onChange, value }) => (
                <TextField
                  size='small'
                  variant='outlined'
                  name='email'
                  fullWidth
                  label='Email Address'
                  type='email'
                  error={errors?.email?.message}
                  helperText={errors?.email?.message}
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

          <Typography variant='caption' className={classes.agree}>
            By signing you agree to{' '}
            <Typography
              color='primary'
              variant='body2'
              display='inline'
              className={classes.text_button}
            >
              Terms & Conditions
            </Typography>{' '}
            &{' '}
            <Typography
              color='primary'
              variant='body2'
              display='inline'
              className={classes.text_button}
            >
              Privacy Policy
            </Typography>
          </Typography>

          <Button
            fullWidth
            size='large'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
          >
            register
          </Button>

          <Typography variant='body2' className={classes.login}>
            Already have an account?{' '}
            <Typography
              color='primary'
              variant='body2'
              display='inline'
              className={classes.text_button}
              onClick={() => setTab(2)}
            >
              Login
            </Typography>
          </Typography>
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
  textField_name: {
    marginTop: theme.spacing(6),
  },
  textField_email: {
    margin: theme.spacing(6, 0),
  },
  textField_password: {
    margin: theme.spacing(2, 0),
  },
  button: {
    marginTop: theme.spacing(8),
  },
  login: {
    marginTop: theme.spacing(3),
    color: theme.palette.secondary.dark,
  },
  text_button: {
    cursor: 'pointer',
  },
  agree: {
    color: theme.palette.secondary.dark,
  },
}));

export default SignTabsRegister;
