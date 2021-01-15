import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  EmailConfirmation,
} from './tabs';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SignTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(2);
  const [email, setEmail] = useState(null);

  return (
    <div className={classes.root}>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <ResetPassword setTab={setValue} email={email} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <ForgotPassword setTab={setValue} email={email} setEmail={setEmail} />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Login setTab={setValue} email={email} setEmail={setEmail} />
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <Register setTab={setValue} setEmail={setEmail} />
      </TabPanel>
      <TabPanel value={value} index={4} dir={theme.direction}>
        <EmailConfirmation setTab={setValue} email={email} />
      </TabPanel>
    </div>
  );
}
