import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';

import { PasswordField, Dialog, Modal } from '../../../ui';

import { rules } from '../../../../utils';

export default function MeProfilePasswordChange() {
  const classes = useStyles();
  const [openDialog, closeDialog] = Dialog.useDialog();

  const { control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = ({ email }) => {};

  return (
    <div className={classes.root}>
      <form className={classes.form}>
        {/* EMAIL ADDRESS  */}
        <Controller
          name='email'
          control={control}
          rules={rules.email}
          defaultValue=''
          render={({ onChange, value }) => (
            <TextField
              label='Email Address'
              variant='outlined'
              className={classes.textField}
              name='email'
              fullWidth
              type='email'
              error={errors?.email}
              helperText={errors?.email?.message}
              onChange={onChange}
              value={value}
            />
          )}
        />

        <Typography className={classes.message}>
          Please enter your new email address and submit to receive email confirmation code.
        </Typography>

        <Button
          variant='contained'
          color='primary'
          size='large'
          className={classes.submit}
          onClick={handleSubmit(onSubmit)}
        >
          CHANGE EMAIL
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
  message: {
    color: theme.palette.grey[500],
    marginTop: theme.spacing(5),
    textAlign: 'center',
  },
  submit: {
    marginTop: theme.spacing(10),
    alignSelf: 'flex-end',
  },
}));
