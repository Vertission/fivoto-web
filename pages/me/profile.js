import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import { Menu, Header } from '../../components/me/profile';
import { EditProfile, PasswordChange, EmailChange, Settings, NotFound } from '../../components/me/profile/menu';

export default function PageMeProfile() {
  const classes = useStyles();

  const hash = global.window && window.location.hash;

  const [menu, setMenu] = useState(hash);

  const RenderSwitchMenu = (key) => {
    switch (key) {
      case '#edit-profile':
        return <EditProfile />;
      case '#password-change':
        return <PasswordChange />;
      case '#email-change':
        return <EmailChange />;
      case '#settings':
        return <Settings />;
      default:
        return <NotFound />;
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
