import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Modal({ title, description, handleClose, closeTitle = 'close', actions = [] }) {
  return (
    <React.Fragment>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions.map(({ title, onClick, style = {} }) => (
          <Button onClick={onClick} variant='contained' color='primary' style={style}>
            {title}
          </Button>
        ))}
        <Button onClick={handleClose} variant='contained' color='primary'>
          {closeTitle}
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}
