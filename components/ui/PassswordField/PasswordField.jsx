import React, { useState } from 'react';
import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export default function PasswordField({ label = 'Password', ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl variant='outlined' style={{ width: '100%' }} size='small'>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        type={showPassword ? 'text' : 'password'}
        {...props}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => setShowPassword((prevState) => !prevState)}
              onMouseDown={(e) => e.preventDefault()}
              edge='end'
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70}
      />
    </FormControl>
  );
}
