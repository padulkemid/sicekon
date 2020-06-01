import React from "react";
import { useHistory } from 'react-router-dom'
import { motion } from "framer-motion";

export default function () {
  const history = useHistory()

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
    <motion.div initial="init" animate="in" exit="out" variants={pageTransition} className='symptomContent'>
      <h3>
        Map page
      </h3>
    </motion.div>
  );
}
