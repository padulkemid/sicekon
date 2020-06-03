import React from 'react'
import next from '../assets/next.png'
import {motion} from 'framer-motion'

export default function Next() {
    return (
        <motion.div whileHover={{ color: "#45fc03"}}>
            <h3 style={{right: "4%", bottom: "4.5%", position: "absolute"}}>Next</h3>
            <img src={next} alt="next" style={{width: "1.56%", right: "1%", bottom: "5.85%", position: "absolute"}}/>
        </motion.div>
    )
}