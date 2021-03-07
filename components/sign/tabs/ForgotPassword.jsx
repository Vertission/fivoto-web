import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { TextField, InputAdornment, Button, Typography, LinearProgress } from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';

import { rules } from '../../../utils/index';

import { useForgotPassword } from '../../../service/amplify/auth';

const SignTabsLogin = ({ setTab, email, setEmail }) => {
  const classes = useStyles();

  const { control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  });

  const [forgotPassword, { loading }] = useForgotPassword(setTab);

  const onSubmit = ({ email }) => {
    forgotPassword(email);
    setEmail(email);
  };

  return (
    <React.Fragment>
      {loading && <LinearProgress classes={{ root: classes.linearProgressRoot }} />}
      <div className={classes.root}>
        <form className={classes.container}>
          <Typography variant='h6'>Forgot Your Password?</Typography>
          <Typography variant='body2' className={classes.description}>
            Please enter your email address and submit to receive reset password verification code.
          </Typography>
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

          <div className={classes.button_group}>
            <Button
              variant='contained'
              color='primary'
              disabled={loading}
              className={classes.button}
              onClick={handleSubmit(onSubmit)}
            >
              submit
            </Button>
            <Button
              variant='outlined'
              color='primary'
              className={classes.button}
              classes={{ label: classes.button_label }}
              onClick={() => setTab(2)}
            >
              back to login
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
