import React from 'react'
import {useHistory} from 'react-router-dom'
import { motion } from "framer-motion";
import {Back, Next} from '../components'

export default function PatientInfo() {
    const history= useHistory()
    function isNext() {
        history.push('/symptom')
    }
    function isBack() {
        history.push('/')
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
      <motion.div initial="init" animate="in" exit="out" variants={pageTransition} className='infoContent'>
        <h3>
          Info Page
        </h3>
      </motion.div>
      <div onClick={isNext} className='point'>
          <Next/>
      </div>
      <div onClick={isBack} className='point'>
          <Back />
      </div>
    </>
  );
}