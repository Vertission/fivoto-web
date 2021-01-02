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

import { PasswordField } from '../../ui';

const SignTabsLogin = ({ setTab }) => {
  const classes = useStyles();

  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.root}>
      <form className={classes.container}>
        <Typography variant='h6'>Welcome Back!</Typography>
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

        <Typography
          variant='body2'
          color='primary'
          className={classes.forgotPassword}
          onClick={() => setTab(1)}
        >
          Forgot Password?
        </Typography>

        <div className={classes.button_group}>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
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
