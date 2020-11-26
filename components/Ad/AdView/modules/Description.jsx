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

  description =
    "Lorem Ipsum is simply dummy \n text of the printing \n and typesetting industry. \n Lorem Ipsum has been the industry's standard dummy text ever since the 1500s \n \n when an unknown printer took a galley of type and scrambled it \n to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing \n \n  \n Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English./n Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,  also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English./n Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,";

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
