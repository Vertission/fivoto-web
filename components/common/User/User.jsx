import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Avatar as MuiAvatar } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppsIcon from '@material-ui/icons/Apps';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// import GroupIcon from '@material-ui/icons/Group';
// import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
// import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';

import { Avatar } from '../../ui';
import { Link } from '../../common';

import { useQueryMe } from '../../../apollo/query';
import { useSignOut } from '../../../service/amplify/auth';

import { snackbar } from '../../../utils';

export default function User() {
  const { enqueueSnackbar } = useSnackbar();

  const [user, { loading }] = useQueryMe();
  const [signOut] = useSignOut(
    () => {
      enqueueSnackbar('Signed out successfully', snackbar.SUCCESS_BOTTOM_CENTER);
    },
    () => {
      enqueueSnackbar(
        'Something went wrong while signing out, Please clear your browser cache',
        snackbar.WARN_BOTTOM_CENTER
      );
    }
  );

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const _handleClickMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const _handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  if (loading)
    return (
      <IconButton size='small'>
        <MuiAvatar />
      </IconButton>
    );
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
          <IconButton size='small' onClick={_handleClickMenu}>
            <Avatar url={user.profile} name={user.name} />
          </IconButton>
          <Menu anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)} onClose={_handleCloseMenu}>
            <MenuItem component={Link} href='/me/advert'>
              <ListItemIcon>
                <AppsIcon color='primary' fontSize='small' />
              </ListItemIcon>
              <ListItemText primary='Advert' />
            </MenuItem>
            <MenuItem component={Link} href='/me#edit-profile'>
              <ListItemIcon>
                <AccountCircleIcon color='primary' fontSize='small' />
              </ListItemIcon>
              <ListItemText primary='Profile' />
            </MenuItem>
            <MenuItem onClick={signOut}>
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
