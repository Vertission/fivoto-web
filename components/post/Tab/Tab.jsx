import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { Category, Location, Field, Publish } from './tabs';

function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3} className={classes.root}>
        {children}
      </Box>
    </Typography>
  );
}

export default function PostTab({ value, setActiveStep, loading, setLoading }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SwipeableViews index={value} style={{ overflow: 'hidden' }} disabled>
        <TabPanel value={value} index={0}>
          <Category setActiveStep={setActiveStep} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Location setActiveStep={setActiveStep} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Field setActiveStep={setActiveStep} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Publish setActiveStep={setActiveStep} loading={loading} setLoading={setLoading} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
}));
