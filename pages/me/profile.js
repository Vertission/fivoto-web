import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import { Menu, Header } from '../../components/me/profile';
import { EditProfile, PasswordChange } from '../../components/me/profile/menu';

export default function PageMeProfile() {
  const classes = useStyles();
  const [menu, setMenu] = useState('edit_profile');

  const RenderSwitchMenu = (key) => {
    switch (key) {
      case 'edit_profile':
        return <EditProfile />;
      case 'password_change':
        return <PasswordChange />;
      case 'email_change':
        return <EditProfile />;
      case 'settings':
        return <EditProfile />;
    }
  };

  return (
    <React.Fragment>
      <Header menu={menu} />
      <Container className={classes.root}>
        <Menu menu={menu} setMenu={setMenu} />
        <div className={classes.wrapper}>{RenderSwitchMenu(menu)}</div>
      </Container>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  wrapper: {
    width: '100%',
  },
}));
