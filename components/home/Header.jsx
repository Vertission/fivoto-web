import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  // Tooltip,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppsIcon from '@material-ui/icons/Apps';
// import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import BookmarkIcon from '@material-ui/icons/Bookmark';
// import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
// import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
// import GroupIcon from '@material-ui/icons/Group';

import { Link } from '../common';
import { Logo, PostButton } from '../ui';

export default function HomeHeader({}) {
  const classes = useStyles();
  const theme = useTheme();

  console.log('theme.mixins.toolbar.height', theme.mixins.toolbar.minHeight);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleClickMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const isLogin = true;

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Logo className={classes.logo} />

          <Link href='/post'>
            <PostButton />
          </Link>

          {isLogin ? (
            <React.Fragment>
              {/* <Tooltip title='groups'>
                <IconButton>
                  <GroupIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='channels'>
                <IconButton>
                  <ForumRoundedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='chats'>
                <IconButton>
                  <ChatBubbleRoundedIcon />
                </IconButton>
              </Tooltip> */}
              <div>
                <IconButton size='small' onClick={handleClickMenu}>
                  <Avatar src='https://material-ui.com/static/images/avatar/1.jpg' />
                </IconButton>
                <Menu anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)} onClose={handleCloseMenu}>
                  <MenuItem component={Link} href='/me'>
                    <ListItemIcon>
                      <AccountCircleIcon color='primary' fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Profile' />
                  </MenuItem>
                  <MenuItem component={Link} href='/me/ads'>
                    <ListItemIcon>
                      <AppsIcon color='primary' fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='My Ads' />
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ExitToAppIcon color='error' fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Logout' />
                  </MenuItem>
                </Menu>
              </div>
            </React.Fragment>
          ) : (
            <Link href='/sign'>
              <Button
                size='large'
                variant='contained'
                color='primary'
                className={classes.sign_button}
                classes={{ label: classes.button_label }}
              >
                sign
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  sign_button: {
    fontWeight: 'bold',
    boxShadow: 'none',
    letterSpacing: 1.5,
    marginLeft: theme.spacing(3),
  },

  logo: {
    cursor: 'pointer',
    marginRight: 'auto',
    width: 35,
    [theme.breakpoints.down('sm')]: {
      width: 30,
    },
  },
  button_label: {
    color: theme.palette.secondary.main,
  },
}));
