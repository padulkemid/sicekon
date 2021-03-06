import React, { useState } from "react";
import { motion } from "framer-motion";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { GenderAge, Symptom, Question, Result } from '../components/CheckPages';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_USER_DATA, CHECK_TRIAGE } from "../schema";
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
  return ['Info', 'Symptoms', 'Questions', 'Diagnosis'];
}

function getStepContent(stepIndex, { setIsComplete, userData, values, setValues, addSymptom, diagnosis, setDiagnosis, triage, setInfoText }) {
  switch (stepIndex) {
    case 0:
      return (<GenderAge setIsComplete={setIsComplete} userData={userData} values={values} setValues={setValues} />);
    case 1:
      return (<Symptom setIsComplete={setIsComplete} values={values} setValues={setValues} addSymptom={addSymptom} setInfoText={setInfoText} />);
    case 2:
      return (<Question setIsComplete={setIsComplete} values={values} addSymptom={addSymptom} setDiagnosis={setDiagnosis} setInfoText={setInfoText} />);
    case 3:
      return (<Result diagnosis={diagnosis} triage={triage} setInfoText={setInfoText} />);
    default:
      return 'Unknown stepIndex';
  }
}

const defaultValues = {
  commonSymptoms: [
    {
      "id": "s_331",
      "name": "nose congestion"
    },
    {
      id: 's_309',
      name: 'bloating'
    },
    {
      id: 's_102',
      name: 'cough'
    },
    {
      id: 's_8',
      name: 'diarrhea'
    },
    {
      id: 's_370',
      name: 'dizziness'
    },
    {
      id: 's_2100',
      name: 'fatigue'
    },
    {
      id: 's_98',
      name: 'fever'
    },
    {
      id: 's_21',
      name: 'headache'
    },
    {
      id: 's_503',
      name: 'muscle cramps'
    },
    {
      id: 's_156',
      name: 'nausea'
    },
  ],
  gender: '',
  symptoms: []
}

export default function () {
  const classes = useStyles();
  const [values, setValues] = useState({ ...defaultValues });
  const [activeStep, setActiveStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [diagnosis, setDiagnosis] = useState({});
  const [triage, setTriage] = useState({});
  const [infoText, setInfoText] = useState('');
  const steps = getSteps();

  const [Check_Triage] = useMutation(CHECK_TRIAGE);
  const checkTriage = async (diagnosis) => {
    try {
      console.log('triaged', JSON.stringify(diagnosis))
      const result = await Check_Triage({
        variables: {
          diagnosis
        }
      });
      console.log('triage', result)
      if (result.data && result.data.checkTriage)
        setTriage(result.data.checkTriage);
    } catch (error) {
      console.log(error);
    }
  }

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

  const { data: userData } = useQuery(GET_USER_DATA);

  const handleNext = () => {
    if (activeStep === 2) {
      const { sex, age, symptoms } = values;
      const evidence = [];
      for (let i in symptoms) {
        evidence.push({
          id: symptoms[i].id,
          choice_id: 'present',
        });
      }
      checkTriage({
        sex,
        age: Number(age),
        evidence,
        "extras": {
          "disable_groups": true
        }
      });
    }
    setInfoText('');
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setInfoText('');
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setInfoText('');
    setActiveStep(0);
    setValues({ ...defaultValues });
  };

  const addSymptom = item => {
    let symptoms = [];
    let commonSymptoms = [];
    if (values.symptoms) {
      symptoms = [...values.symptoms];
      if (symptoms.findIndex(sym => { return sym.id === item.id }) < 0)
        symptoms.push(item);
    }
    if (values.commonSymptoms) {
      commonSymptoms = [...values.commonSymptoms];
      if (commonSymptoms.findIndex(sym => { return sym.id === item.id }) >= 0)
        commonSymptoms[commonSymptoms.findIndex(sym => { return sym.id === item.id })].chosen = true;
    }
    const newValues = { ...values, symptoms, commonSymptoms };
    setValues(newValues);
  }

  return (
    <div className="content check">
      <motion.div initial="init" animate="in" exit="out" variants={pageTransition} className='check-container'>
        <Stepper activeStep={activeStep} alternativeLabel className="stepper">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="content">
          <div className="step-content">
            {getStepContent(activeStep, { setIsComplete, userData, values, setValues, addSymptom, diagnosis, setDiagnosis, triage, setInfoText })}
          </div>
          <div className="info">
            <p className="info-text">{infoText}</p>
          </div>
          <div className="btn-group">
            {activeStep === steps.length - 1 ?
              (
                <>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button onClick={handleReset}>Reset</Button>
                </>
              ) : (
                <>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}
                    disabled={!isComplete}>
                    {activeStep === steps.length - 2 ? 'View Results' : 'Next'}
                  </Button>
                </>
              )
            }
          </div>
        </div>
      </motion.div>
    </div >
  );
}