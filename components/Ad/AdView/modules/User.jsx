import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PhoneIcon from "@material-ui/icons/Phone";

export default function AdUser({ user, phone }) {
  const classes = useStyles();

  user = { name: "Mohammed Usama" };
  phone = ["0768377860", "0814245808"];

  return (
    <div className={classes.root}>
      <Accordion square TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="subtitle1">{user.name}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordion}>
          {phone.map((phone) => (
            <Grid
              key={phone}
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Typography className={classes.phone} variant="h5">
                {phone}
              </Typography>
              <IconButton href={`tel:${phone}`}>
                <PhoneIcon color="primary" />
              </IconButton>
            </Grid>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    // padding: theme.spacing(2),
  },
  phone: {
    fontFamily: "monospace",
  },
  accordion: {
    display: "flex",
    flexDirection: "column",
  },
}));
