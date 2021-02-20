import React, { useState } from 'react';

import { Header, Tab, Context } from '../components/post';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Context.Provider>
      <React.Fragment>
        <Header activeStep={activeStep} setActiveStep={setActiveStep} loading={loading} />
        <Tab value={activeStep} setActiveStep={setActiveStep} loading={loading} setLoading={setLoading} />
      </React.Fragment>
    </Context.Provider>
  );
}
