import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
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
import { Logo, PostButton, Avatar } from '../ui';

import { useQueryMe } from '../../apollo/query';

export default function HomeHeader({ authenticated }) {
  const classes = useStyles();

  const [sign, setSign] = useState(null);

  useEffect(() => {
    async function authenticate() {
      Auth.currentAuthenticatedUser()
        .then(() => {
          setSign(true);
        })
        .catch(() => {
          setUser(false);
        });
    }

    authenticate();
  }, []);

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Logo className={classes.logo} />

          <Link href='/post'>
            <PostButton />
          </Link>

          {sign ? (
            <Authenticated />
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

function Authenticated() {
  const [user, { loading }] = useQueryMe();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleClickMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  if (loading) return <CircularProgress color='secondary' />;
  else
    return (
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
            <Avatar url={user.profile} name={user.name} />
          </IconButton>
          <Menu anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)} onClose={handleCloseMenu}>
            <MenuItem component={Link} href='/me/profile#edit-profile'>
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
