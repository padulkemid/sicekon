import React from "react";
import { useHistory } from 'react-router-dom'
import { motion } from "framer-motion";
import { Next, Back } from "../components";

export default function Symptom() {
    const history = useHistory()
    function isNext() {
        history.push('/')
    }
    function isBack() {
        history.push('/info')
    }

    const pageTransition = {
        init: {
            opacity: 0
        },
        in: {
            opacity: 1
        },
        out: {
            opacity: 0
        },
    };
    return (
        <>
            <motion.div initial="init" animate="in" exit="out" variants={pageTransition} className='LoginRegister'>
                <h3>
                    Symptom page
                </h3>
            </motion.div>
        </>
    );
}
