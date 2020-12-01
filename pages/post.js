import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Header, Tab } from "../components/post";

export default function HomePage() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(1);

  return (
    <React.Fragment>
      <Header activeStep={activeStep} setActiveStep={setActiveStep} />
      <Tab value={activeStep} />
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({}));
