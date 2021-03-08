import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';

import { useChangeEmail } from '../../../../service/amplify/auth';

import { rules } from '../../../../utils';

export default function MeVerifyEmailEmailChange({ setTab, email, setEmail }) {
  const classes = useStyles();

  const { control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  });

  const useChangeEmailCB = () => {
    setTab(0);
    setEmail(email);
  };

  const [changeEmail, { loading }] = useChangeEmail(useChangeEmailCB);

  const onSubmit = ({ email }) => {
    changeEmail(email);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <form className={classes.container}>
          <div className={classes.textField_email}>
            <Controller
              name='email'
              control={control}
              rules={rules.email}
              defaultValue={email}
              render={({ onChange, value }) => (
                <TextField
                  size='small'
                  variant='outlined'
                  name='email'
                  fullWidth
                  label='Email Address'
                  type='email'
                  type='email'
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
              change email address
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: theme.spacing(10),
  },
  container: {
    width: '70%',
  },
  textField_email: {
    margin: theme.spacing(6, 0),
  },
  button_group: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    width: '48%',
  },
}));
