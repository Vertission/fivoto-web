import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Paper, Typography } from "@material-ui/core";

import { AdBlockDetectedWrapper } from "adblock-detect-react";

export default function CommonAdBlockDetector() {
  const classes = useStyles();

  return (
    <AdBlockDetectedWrapper>
      <Container>
        <Paper square className={classes.paper}>
          <Typography variant="button" color="error" gutterBottom>
            Oops! Ad blocker detected
          </Typography>
          <Typography variant="body2">
            While Ad blocker is enabled you are not able to view photos, Because
            photos URL contains word <b>ads</b>. Disable the Ad blocker and
            click reload to view photos else continue without disabling.
          </Typography>
          <Button onClick={() => window.location.reload()} color="primary">
            reload
          </Button>
        </Paper>
      </Container>
    </AdBlockDetectedWrapper>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));
