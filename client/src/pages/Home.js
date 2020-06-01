import React from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from "framer-motion";
import { Next } from '../components'
import '../App.css';

export default function Home() {
    const history = useHistory()
    function isNext() {
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
            <motion.div initial="init" animate="in" exit="out" variants={pageTransition} className='homeContent'>
                <h3>
                    You’re about to use a short (3 min),
            <br />
            safe and anonymous Heath checkup.
            <br />
            Your answers will be carefully analysed
            <br />
            And you’ll learn about possible causes
            <br />
            of your symptoms
            </h3>
            </motion.div>
            <div onClick={isNext} className='point'>
                <Next />
            </div>
        </>
    )
}