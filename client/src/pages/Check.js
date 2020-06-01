import React from "react";
import { useHistory } from 'react-router-dom'
import { motion } from "framer-motion";
import { Next, Back } from "../components";
import { Stepper } from "../components/CheckPages";

export default function () {
  const history = useHistory()
  function isNext() {
    history.push('/')
  }
  function isBack() {
    history.push('/info')
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
  return (
    <>
      <motion.div initial="init" animate="in" exit="out" variants={pageTransition} className='symptomContent'>
        <Stepper />
        <h3>
          Symptom page
        </h3>
      </motion.div>
      <div onClick={isNext} className='point'>
        <Next />
      </div>
      <div onClick={isBack} className='point'>
        <Back />
      </div>
    </>
  );
}
