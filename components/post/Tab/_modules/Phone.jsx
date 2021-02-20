import React, { useContext, useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { IconButton, Divider, TextField, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { Context, dispatch } from '../../Context';

export default function Phone({ maxLength, maxPhone }) {
  const classes = useStyles();

  const [state, setState] = useState('');

  const { phone } = useContext(Context);

  const _onAddPhone = () => {
    setState('');
    dispatch('SET_PHONE', [...phone, state].splice(0, maxPhone));
  };

  const _onRemovePhone = (selectedPhone) => {
    const filteredPhone = phone.filter((phone) => phone !== selectedPhone);
    dispatch('SET_PHONE', filteredPhone);
  };

  return (
    <div>
      <TextField
        label='Phone'
        variant='outlined'
        fullWidth
        className={classes.inputField}
        type='number'
        inputProps={{ maxLength: maxLength }}
        InputProps={{
          endAdornment: (
            <IconButton
              disabled={
                state.length < maxLength || state.length > maxLength || phone.includes(state) || phone.length > maxPhone
              }
              onClick={_onAddPhone}
            >
              <AddIcon
                color={
                  state.length < maxLength ||
                  state.length > maxLength ||
                  phone.includes(state) ||
                  phone.length > maxPhone
                    ? 'disabled'
                    : 'primary'
                }
              />
            </IconButton>
          ),
        }}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />

      <div className={classes.phones}>
        {phone.map((phone) => (
          <div className={classes.phone}>
            <Typography variant='h6'>{phone}</Typography>
            <IconButton onClick={() => _onRemovePhone(phone)}>
              <DeleteIcon color='error' fontSize='large' />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  inputField: {
    width: '100%',
    margin: theme.spacing(4, 0),
    textTransform: 'capitalize',
  },
  phones: {
    marginTop: theme.spacing(2),
  },
  phone: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
