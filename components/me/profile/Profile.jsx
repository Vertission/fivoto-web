import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';

export default function MeEditProfile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.form_container}>
        <Typography variant='button' display='block' gutterBottom>
          Edit User
        </Typography>
        <form className={classes.form}>
          <TextField label='Name' variant='outlined' className={classes.textField} />
        </form>
      </div>
      {/* EMAIL  */}
      <div className={classes.form_container}>
        <Typography variant='button' display='block' gutterBottom>
          Change Email
        </Typography>
        <form className={classes.form}>
          <TextField label='Email' type='email' variant='outlined' className={classes.textField} />
        </form>
      </div>
      {/* PASSWORD  */}
      <div className={classes.form_container}>
        <Typography variant='button' display='block' gutterBottom>
          Change Password
        </Typography>
        <form className={classes.form}>
          <TextField label='Name' variant='outlined' className={classes.textField} />
          <TextField label='Name' variant='outlined' className={classes.textField} />
        </form>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(4),
  },
  form_container: {
    marginTop: theme.spacing(8),
  },
  form: {
    margin: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    width: '50%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
