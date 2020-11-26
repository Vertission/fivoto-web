import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";

import { Logo } from "../../../ui";

export default function AdViewHeader() {
  const [openShare, setOpenShare] = useState(true);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Logo size={40} className={classes.logo} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    cursor: "pointer",
    marginRight: "auto",
  },
}));
