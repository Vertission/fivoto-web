import React, { useState } from "react";
import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function AdViewDescription({ description }) {
  const [openDialog, setOpenDialog] = useState(false);

  const classes = useStyles();

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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
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
