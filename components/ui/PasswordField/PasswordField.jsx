import React, { useState } from 'react';
import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export default function PasswordField({
  label = 'Password',
  error,
  helperText,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl variant='outlined' style={{ width: '100%' }} size='small'>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        type={showPassword ? 'text' : 'password'}
        error={error}
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
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
}
