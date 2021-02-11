import React, { useEffect, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { IconButton, Divider, TextField, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { Context, dispatch } from '../../Context';

export default function DropZone({ maxFiles }) {
  const theme = useTheme();
  const classes = useStyles();

  const [state, setState] = useState(null);

  const { phone } = useContext(Context);

  const _onAddPhone = () => {
    dispatch('SET_PHONE', [...phone, state]);
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
        inputProps={{ maxLength: 10 }}
        InputProps={{
          endAdornment: (
            <IconButton disabled={state?.length < 10 || phone.includes(state)} onClick={_onAddPhone}>
              <AddIcon color={state?.length < 10 ? 'disabled' : 'primary'} />
            </IconButton>
          ),
        }}
        value={state}
        onChange={(e) => setState(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (!(state?.length < 10) || !phone.includes(state)) {
              _onAddPhone();
            }
            e.preventDefault();
          }
        }}
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
    margin: theme.spacing(2, 0),
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
