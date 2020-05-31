import React from "react";
import {useHistory} from 'react-router-dom'
import { motion } from "framer-motion";
import { Next, Back } from "../components";

export default function Symptom() {
  const history= useHistory()
  function isNext() {
      history.push('/')
  }
  function isBack() {
      history.push('/info')
  }

  const pageTransition = {
		init: {
			// x: 300,
		},
		in: {
			x: 0,
		},
		out: {
			// x: 200,
			opacity: 0,
		},
	};
  return (
    <>
      <motion.div initial="init" animate="in" exit="out" variants={pageTransition} className='symptomContent'>
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
