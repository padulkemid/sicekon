import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { motion } from "framer-motion";
import { Next } from '../components'
import { useQuery } from '@apollo/react-hooks';
import { GET_USER_DATA } from "../schema";
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
        {
            text: 'Test5aksjdhkjwhakjhskdhkwh sdnaw dkw akj dskj wjka kjd kjw ajk skdwjasdjwk ajk',
            isUser: true
        },
        {
            text: 'Test5aksjdhkjwhakjhskdhkwh sdnaw dkw akj dskj wjka kjd kjw ajk skdwjasdjwk ajk',
            isUser: false
        },
        {
            text: 'Test5aksjdhkjwhakjhskdhkwh sdnaw dkw akj dskj wjka kjd kjw ajk skdwjasdjwk ajk',
            isUser: true
        },
        {
            text: 'Test5aksjdhkjwhakjhskdhkwh sdnaw dkw akj dskj wjka kjd kjw ajk skdwjasdjwk ajk',
            isUser: true
        },
        {
            text: 'Test5aksjdhkjwhakjhskdhkwh sdnaw dkw akj dskj wjka kjd kjw ajk skdwjasdjwk ajk',
            isUser: true
        },
        {
            text: 'Test5aksjdhkjwhakjhskdhkwh sdnaw dkw akj dskj wjka kjd kjw ajk skdwjasdjwk ajk',
            isUser: true
        },
    ]);

    const dummyMsgRef = useRef();

    const { data: userData } = useQuery(GET_USER_DATA);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dummyMsgRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messageArray])

    useEffect(() => {
        const hasLoading = messageArray.findIndex(msg => msg.loading === true) > -1;
        if (loading && !hasLoading) {
            setMessageArray([...messageArray, { text: "Loading...", isUser: false, loading: true }]);
        }
        else if (!loading && hasLoading) {
            setMessageArray(messageArray.filter(msg => msg.loading !== true));
        }
    }, [loading])

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
                dummyMsgRef.current.scrollIntoView({ behavior: "smooth" });
                setLoading(!loading);
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
                <div className='content' onClick={() => handleClick('chatbot')}>
                    <div className='body'>
                        <div className='messages'>
                            {
                                messageArray.map((msg, idx) => {
                                    return (
                                        <>
                                            <div className={`message ${msg.isUser ? 'user' : 'cekon'}`}>
                                                {
                                                    showIcon(messageArray, idx, msg) &&
                                                    <div className={`logo ${msg.isUser ? 'user' : 'cekon'}`}>
                                                        {userData && userData.userData &&
                                                            msg.isUser ?
                                                            <p>{userData.userData.username[0].toUpperCase()}</p> :
                                                            <img src={require('../assets/doctor.png')} />
                                                        }
                                                    </div>
                                                }
                                                {
                                                    msg.loading ?
                                                        <div className={`box ${msg.isUser ? 'user' : 'cekon'}`}>
                                                            <p className="text"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></p>
                                                        </div> :
                                                        <div className={`box ${msg.isUser ? 'user' : 'cekon'}`}>
                                                            <p className="text">{msg.text}</p>
                                                        </div>
                                                }
                                            </div>
                                            {
                                                showIcon(messageArray, idx, msg) &&
                                                <div className="spacer">
                                                </div>
                                            }
                                        </>
                                    )
                                })
                            }
                            <div id="dummy" ref={dummyMsgRef}></div>
                        </div>
                    </div>
                </div>
                <div className='footer'>

                </div>
            </motion.div>
        </>
    )
}