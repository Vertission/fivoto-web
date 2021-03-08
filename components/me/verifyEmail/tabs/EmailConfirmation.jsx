import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';

import { useResendEmailChangeConfirmationCode, useConfirmEmailChange } from '../../../../service/amplify/auth';

import { rules } from '../../../../utils';

export default function MeVerifyEmailEmailConfirmation() {
  const classes = useStyles();

  const { control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  });

  const [confirmEmailChange, { loading }] = useConfirmEmailChange();

  const [
    resendEmailChangeConfirmationCode,
    { loading: resendEmailChangeConfirmationCodeLoaidng },
  ] = useResendEmailChangeConfirmationCode();

  const onSubmit = ({ code }) => {
    confirmEmailChange(code);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <form className={classes.container}>
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
              disabled={resendEmailChangeConfirmationCodeLoaidng}
              classes={{ label: classes.button_label }}
              onClick={() => resendEmailChangeConfirmationCode()}
            >
              resend code
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
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
  },
  button_label: {
    color: theme.palette.primary.main,
  },
}));
