import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EmailIcon from '@material-ui/icons/Email';
import SettingsIcon from '@material-ui/icons/Settings';

import { Link } from '../../common';

export default function MeProfileMenu({ menu, setMenu }) {
  const classes = useStyles();

  return (
    <List component='nav' className={classes.root} disablePadding>
      {/* Profile  */}
      <ListItem className={classes.listItem} href='/me'>
        <ListItemIcon>
          <Tooltip title='Profile' placement='right'>
            <IconButton onClick={() => setMenu('edit_profile')}>
              <AccountCircleIcon color={menu === 'edit_profile' ? 'primary' : 'disabled'} fontSize='large' />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
        <ListItemText />
      </ListItem>
      {/* Password  */}
      <ListItem className={classes.listItem} component={Link} href='/me/profile'>
        <ListItemIcon>
          <Tooltip title='Password' placement='right'>
            <IconButton onClick={() => setMenu('password_change')}>
              <VpnKeyIcon color={menu === 'password_change' ? 'primary' : 'disabled'} fontSize='large' />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
        <ListItemText />
      </ListItem>
      {/* Email */}
      <ListItem className={classes.listItem}>
        <ListItemIcon>
          <Tooltip title='Email' placement='right'>
            <IconButton onClick={() => setMenu('email_change')}>
              <EmailIcon color={menu === 'email_change' ? 'primary' : 'disabled'} fontSize='large' />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
        <ListItemText />
      </ListItem>
      {/* SETTINGS */}
      <ListItem className={classes.listItem}>
        <ListItemIcon>
          <Tooltip title='Settings' placement='right'>
            <IconButton onClick={() => setMenu('settings')}>
              <SettingsIcon color={menu === 'settings' ? 'primary' : 'disabled'} fontSize='large' />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
        <ListItemText />
      </ListItem>
    </List>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 100,
  },
  listItem: {
    alignItem: 'center',
  },
}));
