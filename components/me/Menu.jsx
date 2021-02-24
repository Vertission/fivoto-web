import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import AppsIcon from '@material-ui/icons/Apps';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function Menu() {
  const classes = useStyles();

  return (
    <List component='nav' className={classes.root} disablePadding>
      {/* PROFILE  */}
      <ListItem className={classes.listItem}>
        <ListItemIcon>
          <Tooltip title='Profile' placement='right'>
            <IconButton>
              <AccountCircleIcon color='primary' fontSize='large' />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
        <ListItemText />
      </ListItem>
      {/* ADS */}
      <ListItem className={classes.listItem}>
        <ListItemIcon>
          <Tooltip title='Ads' placement='right'>
            <IconButton>
              <AppsIcon color='primary' fontSize='large' />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
        <ListItemText />
      </ListItem>
      {/* FAVORITES */}
      <ListItem className={classes.listItem}>
        <ListItemIcon>
          <Tooltip title='Favorites' placement='right'>
            <IconButton>
              <FavoriteIcon color='primary' fontSize='large' />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
        <ListItemText />
      </ListItem>
      {/* SETTINGS */}
      <ListItem className={classes.listItem}>
        <ListItemIcon>
          <Tooltip title='Settings' placement='right'>
            <IconButton>
              <SettingsIcon color='primary' fontSize='large' />
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
