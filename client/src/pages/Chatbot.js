import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { motion } from "framer-motion";
import { Next } from '../components'
import '../styles/Chatbot.scss';

export default function () {
    const history = useHistory()

    const [messageArray, setMessageArray] = useState([
        {
            text: 'Test1',
            isUser: false
        },
        {
            text: 'Test2',
            isUser: false
        },
        {
            text: 'Test3',
            isUser: true
        },
        {
            text: 'Test4',
            isUser: false
        },
        {
            text: 'Test5',
            isUser: true
        },
    ]);

    const showIcon = (arr, idx, msg) => {
        if (idx < arr.length - 1) {
            if (arr[idx + 1].isUser !== msg.isUser)
                return true;
        }
        else if (idx === arr.length - 1)
            return true;
        else
            return false;
    };


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
            <motion.div initial="init" animate="in" exit="out" variants={pageTransition} className='chatbot'>
                <div className='content'>
                    <div className='header'>
                    </div>
                    <div className='body'>
                        <div className='messages'>
                            {
                                messageArray.map((msg, idx) => {
                                    return (
                                        <div className={`message ${msg.isUser ? 'user' : 'cekon'}`}>
                                            {
                                                showIcon(messageArray, idx, msg) &&
                                                <div className="logo">
                                                    {
                                                        msg.isUser ?
                                                            <img src={require('../assets/halodoc.png')} /> :
                                                            <img src={require('../assets/halodoc.png')} />
                                                    }
                                                </div>
                                            }
                                            <div className={`box ${msg.isUser ? 'user' : 'cekon'}`}>
                                                <p className="text">{msg.text}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='footer'>

                    </div>
                </div>
            </motion.div>
        </>
    )
}