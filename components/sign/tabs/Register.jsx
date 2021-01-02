import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  InputAdornment,
  Button,
  Typography,
} from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { PasswordField } from '../../ui';

const SignTabsRegister = ({ setTab }) => {
  const classes = useStyles();

  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setTab(4);
  };

  return (
    <div className={classes.root}>
      <form className={classes.container}>
        <Typography variant='h6'>Register An Account</Typography>
        <div className={classes.textField_name}>
          <Controller
            name='name'
            control={control}
            defaultValue=''
            render={({ onChange, value }) => (
              <TextField
                size='small'
                variant='outlined'
                name='name'
                fullWidth
                label='Name'
                type='name'
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
            render={({ onChange, value }) => (
              <TextField
                size='small'
                variant='outlined'
                name='email'
                fullWidth
                label='Email Address'
                type='email'
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
            name='firstName'
            control={control}
            defaultValue=''
            render={({ onChange, value }) => (
              <PasswordField onChange={onChange} value={value} />
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
          onClick={onSubmit}
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
