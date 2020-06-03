import React from 'react'
import { motion } from "framer-motion";

export default function PatientInfo() {

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
    <motion.div initial="init" animate="in" exit="out" variants={pageTransition} className='infoContent'>
      <h3>
        Info Page
        </h3>
    </motion.div>
  );
}