import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import { makeStyles, fade } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { snackbar } from '../../../utils';
import { dispatch } from '../../post/Context';

export default function PostButton() {
  const classes = useStyles();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const _handleNavigation = async () => {
    dispatch('RESET_CONTEXT');
    try {
      const url = `https://sentry-test90426-dev.s3.ap-south-1.amazonaws.com/public/ads/download.png?=${new Date().getTime()}`;

      await axios.get(url);
      router.push('/post');
    } catch (error) {
      enqueueSnackbar(`Please disable your ad blocker to post ads.`, snackbar.ERROR_TOP_CENTER);
    }
  };

  return (
    <Button size='large' className={classes.root} classes={{ label: classes.button_label }} onClick={_handleNavigation}>
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
