import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { motion } from "framer-motion";
import { Next } from '../components'
import '../styles/Home.scss';

export default function Home() {
    const history = useHistory()
    function isNext() {
        history.push('/info')
    }

    const handleClick = (prop) => {
        switch (prop) {
            case 'check':
                history.push('/check')
                break;
            case 'chatbot':
                history.push('/chatbot')
                break;
            default:
                break;
        }
    };

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
            <motion.div initial="init" animate="in" exit="out" variants={pageTransition} className='home content'>
                <div className='content'>
                    <p className="top">A simple and easy to use online symptom checker. To start, simply:</p>
                    <Button onClick={() => { handleClick('check') }} className="btn check-btn" variant="outlined" color="primary">
                        <img className="icon" src={require('../assets/list.svg')} />
                        <p>Use our Interactive Web App</p>
                    </Button>
                    <div className="seperator">
                        <hr></hr>
                    </div>
                    <div className="seperator">
                        <p>Or</p>
                    </div>
                    <Button onClick={() => { handleClick('chatbot') }} className="btn chatbot-btn" variant="outlined" color="primary">
                        <img className="icon" src={require('../assets/chat.svg')} />
                        <p>Talk Directly with Cekon</p>
                    </Button>
                </div>
            </motion.div>
        </>
    )
}