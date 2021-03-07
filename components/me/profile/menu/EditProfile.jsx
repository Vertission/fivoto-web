import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Avatar, Button, IconButton } from '@material-ui/core';

import CameraAltIcon from '@material-ui/icons/CameraAlt';

import { rules } from '../../../../utils';

export default function MeProfileEditProfile() {
  const classes = useStyles();

  const { control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = ({ name }) => {};

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
        <Controller
          name='name'
          control={control}
          defaultValue=''
          rules={rules.name}
          render={({ onChange, value }) => (
            <TextField
              label='Name'
              variant='outlined'
              fullWidth
              variant='outlined'
              name='name'
              type='text'
              error={errors?.name}
              helperText={errors?.name?.message}
              onChange={onChange}
              value={value}
            />
          )}
        />

        <Button
          variant='contained'
          color='primary'
          size='large'
          className={classes.save}
          onClick={handleSubmit(onSubmit)}
        >
          save profile
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
