import React from "react";
import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Grid } from "@material-ui/core";

export default function AdViewFields({ fields }) {
  const classes = useStyles();

  fields = {
    brand: "Toyota",
    model: "Axio",
    condition: "used",
    engine: { value: "1500", key: "cc" },
    year: 2008,
    transmission: "Automatic",
    fuel: "Petrol",
    milage: { value: 118000, key: "km" },
  };

  const Fields = (fields) => {
    return Object.keys(fields)
      .filter((k) => typeof fields[k] !== "boolean")
      .map((field) => {
        if (typeof fields[field] === "object")
          return (
            <Grid
              key={field}
              container
              direction="row"
              className={classes.grid}
            >
              <Typography className={classes.field}>{field}:</Typography>
              {Object.values(fields[field]).map((e, i) => (
                <Typography key={e} className={classes.value}>
                  {e}
                </Typography>
              ))}
            </Grid>
          );
        return (
          <Grid key={field} container direction="row" className={classes.grid}>
            <Typography className={classes.field}>{field}:</Typography>
            <Typography className={classes.value}>{fields[field]}</Typography>
          </Grid>
        );
      });
  };

  if (_.isEmpty(Fields(fields))) return null;
  else
    return (
      <Paper square className={classes.root}>
        {Fields(fields)}
      </Paper>
    );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  value: {
    marginLeft: theme.spacing(1),
  },
  field: {
    fontWeight: "600",
    textTransform: "capitalize",
  },
  grid: {
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));
