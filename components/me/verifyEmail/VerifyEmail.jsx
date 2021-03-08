import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Tabs } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import { EmailConfirmation, ChangeEmail } from './tabs';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role='tabpanel' hidden={value !== index} id={`full-width-tabpanel-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

export default function MeVerifyEmail({ email }) {
  const classes = useStyles();

  const [tab, setTab] = useState(1);
  const [emailAddress, setEmailAddress] = useState(email);

  const _onHandleVerifyEmailAddressClick = () => {
    setTab(0);
  };

  const _onHandleVerifyChangeEmailAddressClick = () => {
    setTab(1);
  };

  return (
    <div className={classes.root}>
      <Typography variant='h6'>
        Please verify your email address <i>{emailAddress}</i>
      </Typography>

      <div className={classes.button_group}>
        <Button
          size='large'
          color='primary'
          variant={tab === 0 ? 'contained' : 'outlined'}
          className={classes.button}
          onClick={_onHandleVerifyEmailAddressClick}
        >
          verify email address
        </Button>

        <Button
          size='large'
          color='primary'
          variant={tab === 1 ? 'contained' : 'outlined'}
          className={classes.button}
          onClick={_onHandleVerifyChangeEmailAddressClick}
        >
          change email address
        </Button>
      </div>

      <div>
        <TabPanel value={tab} index={0}>
          <EmailConfirmation />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <ChangeEmail email={emailAddress} setEmail={setEmailAddress} setTab={setTab} />
        </TabPanel>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
  },
  button_group: {
    marginTop: theme.spacing(5),
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
  },
}));
