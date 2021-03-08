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
      <ListItem className={classes.listItem} component={Link} href='/me/profile#edit-profile'>
        <ListItemIcon>
          <Tooltip title='Profile' placement='right'>
            <IconButton onClick={() => setMenu('#edit-profile')}>
              <AccountCircleIcon color={menu === '#edit-profile' ? 'primary' : 'disabled'} fontSize='large' />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
        <ListItemText />
      </ListItem>
      {/* Password  */}
      <ListItem className={classes.listItem} component={Link} href='/me/profile#password-change'>
        <ListItemIcon>
          <Tooltip title='Password' placement='right'>
            <IconButton onClick={() => setMenu('#password-change')}>
              <VpnKeyIcon color={menu === '#password-change' ? 'primary' : 'disabled'} fontSize='large' />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
        <ListItemText />
      </ListItem>
      {/* Email */}
      <ListItem className={classes.listItem} component={Link} href='/me/profile#email-change'>
        <ListItemIcon>
          <Tooltip title='Email' placement='right'>
            <IconButton onClick={() => setMenu('#email-change')}>
              <EmailIcon color={menu === '#email-change' ? 'primary' : 'disabled'} fontSize='large' />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
        <ListItemText />
      </ListItem>
      {/* SETTINGS */}
      <ListItem className={classes.listItem}>
        <ListItemIcon>
          <Tooltip title='Settings' placement='right' component={Link} href='/me/profile#settings'>
            <IconButton onClick={() => setMenu('#settings')}>
              <SettingsIcon color={menu === '#settings' ? 'primary' : 'disabled'} fontSize='large' />
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
    [theme.breakpoints.down('sm')]: {
      width: 'initial',
    },
  },
  listItem: {
    alignItem: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
}));
