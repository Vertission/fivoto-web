import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Avatar, Button, IconButton, CircularProgress } from '@material-ui/core';

import CameraAltIcon from '@material-ui/icons/CameraAlt';

import { rules, snackbar } from '../../../../utils';

import { useQueryMe } from '../../../../apollo/query';
import { useUpdateUser } from '../../../../apollo/mutation';

export default function MeProfileEditProfile() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [profile, setProfile] = useState(null);

  const [updateUser, { loading: updateUserLoading }] = useUpdateUser(
    () => {
      enqueueSnackbar('Profile updated successfully', snackbar.SUCCESS_BOTTOM_CENTER);
    },
    () => {
      enqueueSnackbar('Oops! Something went wrong while updating profile', snackbar.ERROR_BOTTOM_CENTER);
    }
  );
  const [user, { loading: userLoading }] = useQueryMe(({ me }) => {
    setProfile(me.profile);
  });

  const { control, handleSubmit, errors, register } = useForm({
    mode: 'onBlur',
  });

  const _handleProfileUpload = (event) => {
    const previewUrl = URL.createObjectURL(event.target.files[0]);
    setProfile(previewUrl);
  };

  const onSubmit = ({ name, profile }) => {
    updateUser({ name, profile: profile[0] }, user.id);
  };

  if (userLoading)
    return (
      <div className={classes.root_circular}>
        <CircularProgress />
      </div>
    );

  return (
    <div className={classes.root}>
      <form className={classes.form}>
        {/* PROFILE PICTURE  */}
        <div className={classes.avatar_container}>
          <input
            type='file'
            accept='image/*'
            name='profile'
            id='contained-button-file'
            hidden
            ref={register}
            onChange={_handleProfileUpload}
          />
          <Avatar alt='Remy Sharp' src={profile} className={classes.avatar_image}>
            UA
          </Avatar>
          <label htmlFor='contained-button-file' className={classes.avatar_camera}>
            <IconButton variant='contained' color='primary' component='span'>
              <CameraAltIcon color='primary' />
            </IconButton>
          </label>
        </div>
        {/* NAME  */}
        <Controller
          name='name'
          control={control}
          defaultValue={user.name}
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
          disabled={updateUserLoading}
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
  root_circular: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
