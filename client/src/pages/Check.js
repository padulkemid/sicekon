import React from "react";
import { motion } from "framer-motion";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { GenderAge, Symptom, Result } from '../components/CheckPages';
import '../styles/Check.scss';
import '../styles/CheckPage.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Info', 'Symptoms', 'Diagnosis'];
}

function getStepContent(stepIndex, setIsComplete) {
  switch (stepIndex) {
    case 1:
      return (<GenderAge setIsComplete={setIsComplete} />);
    case 0:
      return (<Symptom setIsComplete={setIsComplete} />);
    case 2:
      return (<Result setIsComplete={setIsComplete} />);
    default:
      return 'Unknown stepIndex';
  }
}

export default function () {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);
  const steps = getSteps();

  const pageTransition = {
    init: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
    },
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setIsComplete(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setIsComplete(true);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="content">
      <motion.div initial="init" animate="in" exit="out" variants={pageTransition} className='check-container'>
        <Stepper activeStep={activeStep} alternativeLabel className="stepper">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ?
          (
            <>
              <div className="content">
                <div className="step-content">
                  <Typography className={classes.instructions}>All steps completed</Typography>
                </div>
                <div className="btn-group">
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="content">
                <div className="step-content">
                  {getStepContent(activeStep, setIsComplete)}
                </div>
                <div className="btn-group">
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}
                    disabled={!isComplete}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </>
          )
        }
      </motion.div>
    </div >
  );
}