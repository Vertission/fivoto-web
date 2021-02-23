import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { List, Collapse, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import AppsIcon from '@material-ui/icons/Apps';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import BookmarkIcon from '@material-ui/icons/Bookmark';

export default function NestedList() {
  const classes = useStyles();
  const theme = useTheme();

  const [profileOpen, setProfileOpen] = useState(false);
  const [adsOpen, setAdsOpen] = useState(false);

  return (
    <List component='nav' className={classes.root}>
      {/* DASHBOARD */}
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon color='primary' />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>
      {/* ADS  */}
      <ListItem button onClick={() => setAdsOpen(!adsOpen)}>
        <ListItemIcon>
          <AppsIcon color='primary' />
        </ListItemIcon>
        <ListItemText primary='Ads' />
        {/* {adsOpen ? <ExpandLessIcon color='primary' /> : <ExpandMoreIcon color='primary' />} */}
      </ListItem>
      <Collapse in={adsOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ViewAgendaIcon style={{ color: theme.palette.success.main }} />
            </ListItemIcon>
            <ListItemText primary='Approved' />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ViewAgendaIcon style={{ color: theme.palette.warning.main }} />
            </ListItemIcon>
            <ListItemText primary='Pending' />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ViewAgendaIcon color='error' />
            </ListItemIcon>
            <ListItemText primary='Rejected' />
          </ListItem>
        </List>
      </Collapse>
      {/* BOOKMARK */}
      <ListItem button>
        <ListItemIcon>
          <BookmarkIcon color='primary' />
        </ListItemIcon>
        <ListItemText primary='Bookmarks' />
      </ListItem>
      {/* PROFILE */}
      <ListItem button onClick={() => setProfileOpen(!profileOpen)}>
        <ListItemIcon>
          <AccountCircleIcon color='primary' />
        </ListItemIcon>
        <ListItemText primary='Profile' />
        {/* {profileOpen ? <ExpandLessIcon color='primary' /> : <ExpandMoreIcon color='primary' />} */}
      </ListItem>
      <Collapse in={profileOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <CreateIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Edit Profile' />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <EmailIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Change Email' />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <VpnKeyIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary='Change Password' />
          </ListItem>
        </List>
      </Collapse>
      {/* SETTINGS */}
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon color='primary' />
        </ListItemIcon>
        <ListItemText primary='Settings' />
      </ListItem>
    </List>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(12),
  },
}));
