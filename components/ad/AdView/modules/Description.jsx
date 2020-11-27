import React, { useState } from "react";
import _ from "lodash";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  useMediaQuery,
  // Slide,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// }); // use this transition on XS device

export default function AdViewDescription({ description }) {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <React.Fragment>
      <Paper square className={classes.root}>
        <Typography variant="body2" className={classes.description}>
          {_.truncate(description, { length: 250 })}
        </Typography>
        <Button
          size="small"
          color="primary"
          disabled={description.length < 250}
          endIcon={<ArrowForwardIosIcon />}
          className={classes.readMoreButton}
          onClick={setOpenDialog}
        >
          show more
        </Button>
      </Paper>

      <Dialog
        open={openDialog}
        fullScreen={fullScreen}
        keepMounted
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Description</DialogTitle>
        <DialogContent>
          <DialogContentText variant="body2" style={{ whiteSpace: "pre-line" }}>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
  },
  description: {
    whiteSpace: "pre-line",
    padding: theme.spacing(1),
  },
}));
