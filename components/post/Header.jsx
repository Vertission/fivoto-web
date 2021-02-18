import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Stepper, Step, LinearProgress, StepLabel, Button } from '@material-ui/core';
import Reset from '@material-ui/icons/SettingsBackupRestore';
import Back from '@material-ui/icons/ArrowBackIos';
import Next from '@material-ui/icons/ArrowForwardIos';

import { Context } from './Context';

export default function PostAd({ loading, activeStep, setActiveStep }) {
  const { category, location } = useContext(Context);
  const classes = useStyles();

  const steps = [category.item || 'Category', location.city || 'Location', 'Create', 'Publish'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    window.location.reload();
  };

  // const keepOnPage = (e) => {
  //   var message = "Changes you made may not be saved.";
  //   e.returnValue = message;
  //   return message;
  // };

  // useEffect(() => {
  //   window.addEventListener("beforeunload", keepOnPage);

  //   return () => {
  //     window.removeEventListener("beforeunload", keepOnPage);
  //   };
  // }, []);

  return (
    <>
      {loading ? <LinearProgress /> : <LinearProgress variant='determinate' value={activeStep * 33.33} />}
      <div className={classes.root}>
        <div className={classes.stepRoot}>
          <Stepper
            style={{ background: '#fafafa' }}
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <Container className={classes.btnGrp}>
          {activeStep === 0 ? null : (
            <>
              {' '}
              <Button
                onClick={handleReset}
                className={classes.btnReset}
                variant='contained'
                color='primary'
                endIcon={<Reset />}
              >
                Reset
              </Button>
              <Button onClick={handleBack} variant='contained' color='primary' startIcon={<Back />}>
                Back
              </Button>
            </>
          )}
          {((activeStep === 0 && category.item) || (activeStep === 1 && location.city) || activeStep === 2) && (
            <Button
              onClick={handleNext}
              className={classes.btnNext}
              variant='contained'
              color='primary'
              endIcon={<Next />}
            >
              Next
            </Button>
          )}
        </Container>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  stepRoot: {
    width: '100%',
  },
  btnGrp: {
    padding: theme.spacing(1),
    display: 'flex',
  },
  btnNext: {
    marginLeft: 'auto',
  },
  btnReset: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    position: 'absolute',
    top: 0,
    padding: theme.spacing(2),
  },
}));

import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { StepConnector } from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage: 'linear-gradient(90deg, #5bd592 0%, #5bd592 35%, #5bd592 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient(90deg, #5bd592 0%, #5bd592 35%, #5bd592 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 30,
      height: 30,
    },
  },
  active: {
    backgroundImage: 'linear-gradient(301deg, #5bd592 0%, #5bd592 35%, #5bd592 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage: 'linear-gradient(301deg, #5bd592 0%, #5bd592 35%, #5bd592 100%)',
  },
}));

function StepIcon({ active, completed, icon }) {
  const classes = useColorlibStepIconStyles();

  const icons = {
    1: <LabelIcon />,
    2: <LocationOnIcon />,
    3: <EditIcon />,
    4: <CheckIcon />,
    5: <CheckIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  );
}
