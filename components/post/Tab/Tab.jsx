import React from "react";
import SwipeableViews from "react-swipeable-views";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { Category } from "./tabs";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

export default function PostTab({ value }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SwipeableViews index={value} style={{ overflow: "hidden" }} disabled>
        <TabPanel value={value} index={0}>
          <Category />
        </TabPanel>
        <TabPanel value={value} index={1}>
          location
        </TabPanel>
        <TabPanel value={value} index={2}>
          create ad
        </TabPanel>
        <TabPanel value={value} index={3}>
          publish
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
}));
