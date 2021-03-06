import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Avatar, Button, IconButton } from '@material-ui/core';

import CameraAltIcon from '@material-ui/icons/CameraAlt';

export default function MeProfileEditProfile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <form className={classes.form}>
        {/* PROFILE PICTURE  */}
        <div className={classes.avatar_container}>
          <Avatar alt='Remy Sharp' src='' className={classes.avatar_image}>
            UA
          </Avatar>
          <IconButton className={classes.avatar_camera}>
            <CameraAltIcon color='primary' />
          </IconButton>
        </div>
        {/* NAME  */}
        <TextField label='Name' variant='outlined' fullWidth />

        <Button variant='contained' color='primary' size='large' className={classes.save}>
          Save
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
  avatar_container: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
  },
  avatar_image: {
    width: 100,
    height: 100,
    fontSize: theme.typography.h1.fontSize,
  },
  avatar_camera: {
    position: 'absolute',
  },
  save: {
    marginTop: theme.spacing(10),
    alignSelf: 'flex-end',
  },
}));
