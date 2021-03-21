import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function PostButton() {
  const classes = useStyles();
  return (
    <Button size='large' className={classes.root} classes={{ label: classes.button_label }}>
      post ad
    </Button>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    padding: '0 30px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    height: 43,
    '&:hover': {
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    marginRight: theme.spacing(3),
  },
  button_label: {
    fontWeight: 900,
  },
}));
