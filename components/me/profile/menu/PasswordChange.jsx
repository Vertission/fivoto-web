import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Avatar, Button, IconButton } from '@material-ui/core';

import { PasswordField } from '../../../ui';

export default function MeProfilePasswordChange() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <form className={classes.form}>
        {/* CURRENT PASSWORD  */}
        <TextField label='Current Password' variant='outlined' fullWidth />

        {/* NEW PASSWORD  */}
        <PasswordField />

        <Button variant='contained' color='primary' size='large' className={classes.save}>
          CHANGE
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
  },
  save: {
    marginTop: theme.spacing(10),
    alignSelf: 'flex-end',
  },
}));
