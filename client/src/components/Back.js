import React from 'react'
import back from '../assets/back.png'
import {motion} from 'framer-motion'


export default function Back() {
    return (
        <motion.div whileHover={{ color: "#45fc03" }}>
            <h3 style={{right: "35%", bottom: "4.5%", position: "absolute"}}>Back</h3>
            <img src={back} alt="back" style={{width: "1.56%", right: "40%", bottom: "5.85%", position: "absolute"}}/>
        </motion.div>
    )
}