import React, { useState } from 'react';
import { useRouter } from 'next/router';
import parse from 'url-parse';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import { Menu, Header } from '../../components/me/profile';
import { EditProfile, PasswordChange, NotFound } from '../../components/me/profile/menu';

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
        return <EditProfile />;
      case '#settings':
        return <EditProfile />;
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
