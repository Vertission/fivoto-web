import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography } from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';

const SignTabsLogin = ({ setTab }) => {
  const classes = useStyles();

  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setTab(2);
  };

  return (
    <div className={classes.root}>
      <form className={classes.container}>
        <Typography variant='h6'>Email Confirmation</Typography>
        <Typography variant='body2' className={classes.description}>
          Please enter the confirmation code we send to your email address
          mohammedusama@gmail.com
        </Typography>
        <div className={classes.textField_email}>
          <Controller
            name='code'
            control={control}
            defaultValue=''
            render={({ onChange, value }) => (
              <TextField
                size='small'
                variant='outlined'
                name='code'
                fullWidth
                label='Verification Code'
                type='code'
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
            onClick={onSubmit}
          >
            confirm
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
