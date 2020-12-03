import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Header, Tab, Context } from "../components/post";

export default function HomePage() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Context.Provider>
      <React.Fragment>
        <Header activeStep={activeStep} setActiveStep={setActiveStep} />
        <Tab value={activeStep} setActiveStep={setActiveStep} />
      </React.Fragment>
    </Context.Provider>
  );
}

const useStyles = makeStyles((theme) => ({}));
