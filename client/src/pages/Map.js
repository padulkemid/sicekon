import React from 'react';
import { motion } from 'framer-motion';
import { DisplayMap } from '../components'

export default function () {
  const pageTransition = {
    init: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {},
  };

  return (
    <motion.div
      initial="init"
      animate="in"
      exit="out"
      variants={pageTransition}
      >
      <DisplayMap />
    </motion.div>
  );
}
