import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import { motion } from "framer-motion";
import { Next } from '../components'
import { GenderInput, TextInput } from '../components';
import { Result } from '../components/CheckPages';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_USER_DATA, CHAT_FINAL_RESPONSE, DIAGNOSE_SYMPTOMS, CHECK_TRIAGE } from "../schema";
import Chip from '@material-ui/core/Chip';
import theBot from '../helpers/theBot.js'
import '../styles/Chatbot.scss';

export default function () {
    const history = useHistory()

    const [msgArr, setMsgArr] = useState([]);

    const [textVal, setTextVal] = useState('');

    const [lastSent, setLastSent] = useState('');

    const [disabled, setDisabled] = useState(false);

    const [values, setValues] = useState({
        symptoms: [],
    });

    const [answerType, setAnswerType] = useState('text');

    const [answerFun, setAnswerFun] = useState({});

    const dummyMsgRef = useRef();

    const { data: userData } = useQuery(GET_USER_DATA);

    const [loading, setLoading] = useState(false);

    const [diagnosis, setDiagnosis] = useState({});

    const [showDiagnosis, setShowDiagnosis] = useState(false);

    const [triage, setTriage] = useState({});

    const [question, setQuestion] = useState({});

    const [questionsAnswered, setQuestionsAnswered] = useState(0);

    const [Chat_Final_Response] = useMutation(CHAT_FINAL_RESPONSE);
    const chat = async (complaintText) => {
        setLoading(true);
        try {
            const sentText = textVal;
            setTextVal('')
            const result = await Chat_Final_Response({
                variables: {
                    complaint: {
                        text: complaintText
                    }
                }
            });
            setLoading(false);
            theBot.fun.sendSymptoms(getBotProps(), result, sentText);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        getQuestion();
    }, [questionsAnswered])

    const [Diagnose_Symptoms] = useMutation(DIAGNOSE_SYMPTOMS);
    const diagnoseSymptoms = async (diagnosis, lastAnswer) => {
        setLoading(true);
        try {
            const result = await Diagnose_Symptoms({
                variables: {
                    diagnosis
                }
            });
            console.log(result)
            const newMsg = {
                text: result.data.diagnoseSymptoms.question.text,
                isUser: false,
                question: result.data.diagnoseSymptoms.question
            }
            setQuestion(result.data.diagnoseSymptoms.question);
            if (lastAnswer)
                setMsgArr([...msgArr, lastAnswer, newMsg]);
            else
                setMsgArr([...msgArr, newMsg]);
            setDiagnosis(result.data.diagnoseSymptoms);
            const { sex, age, symptoms } = values;
            const evidence = [];
            for (let i in symptoms) {
                evidence.push({
                    id: symptoms[i].id,
                    choice_id: 'present',
                });
            }
            checkTriage({
                sex,
                age: Number(age),
                evidence,
                "extras": {
                    "disable_groups": true
                }
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const [Check_Triage] = useMutation(CHECK_TRIAGE);
    const checkTriage = async (diagnosis) => {
        try {
            const result = await Check_Triage({
                variables: {
                    diagnosis
                }
            });
            if (result.data && result.data.checkTriage)
                setTriage(result.data.checkTriage);
        } catch (error) {
            console.log(error);
        }
    }

    const getQuestion = (lastAnswer) => {
        const { sex, age, symptoms } = values;
        const evidence = [];
        for (let i in symptoms) {
            evidence.push({
                id: symptoms[i].id,
                choice_id: symptoms[i].choice_id ? symptoms[i].choice_id : 'present'
            });
        }
        console.log({
            sex,
            age: Number(age),
            evidence,
            "extras": {
                "disable_groups": true
            }
        })
        diagnoseSymptoms({
            sex,
            age: Number(age),
            evidence,
            "extras": {
                "disable_groups": true
            }
        }, lastAnswer);
    }

    useEffect(() => {
        theBot.fun.sendFirst(getBotProps());
    }, [userData])

    useEffect(() => {
        dummyMsgRef.current.scrollIntoView({ behavior: "smooth" });
        console.log(msgArr)
        if (msgArr.length < 2)
            theBot.fun.sendFirst(getBotProps());
    }, [msgArr])

    const getBotProps = () => {
        return {
            setMsgArr, userData, msgArr, setAnswerType, setAnswerFun, setValues,
            values, chat, addMsgArr, setQuestionsAnswered, questionsAnswered,
            getQuestion, addSympArr
        };
    };

    const addMsgArr = (msg) => {
        setMsgArr([...msgArr, ...msg]);
    };

    const addSympArr = (sympArr) => {
        setValues({ ...values, symptoms: [...values.symptoms, ...sympArr] });
    };

    const showIcon = (arr, idx, msg) => {
        if (idx < arr.length - 1) {
            if (arr[idx + 1] && arr[idx + 1].isUser !== msg.isUser)
                return true;
        }
        else if (idx === arr.length - 1)
            return true;
        else
            return false;
    };

    const handleChange = (prop) => (event) => {
        switch (prop) {
            case 'text':
                setTextVal(event.target.value);
                break;
            default:
                const newValues = { ...values, [prop]: event.target.value };
                setValues(newValues);
                break;
        }
    };

    const handleClick = (prop, val, textValue) => {
        switch (prop) {
            case 'check':
                history.push('/check')
                break;
            case 'chatbot':
                console.log(msgArr);
                dummyMsgRef.current.scrollIntoView({ behavior: "smooth" });
                // setLoading(!loading);
                break;
            case 'yesno':
                if (val === 'yes') {
                    answerFun.yes(getBotProps());
                }
                else if (val === 'no') {
                    answerFun.no(getBotProps());
                }
                break;
            case 'yesnodk':
                if (val === 'done') {
                    setDisabled(true);
                    answerFun.done(getBotProps());
                    let symptoms = [...values.symptoms];
                    for (let i in symptoms) {
                        symptoms[i].disabled = true;
                    }
                    setValues({ ...values, symptoms });
                }
                else if (val === 'send') {
                    const answers = {
                        present: ['yes', 'yea', 'y', 'yup', 'mhmm', 'correct', 'positive'],
                        absent: ['no', 'nope', 'nuh', 'negative', 'incorrect', 'n'],
                        unknown: ['unknown', 'idk', 'i dont know', 'dont know', 'unsure', 'not sure'],
                        done: ['results', 'tell me the results', 'done', 'im done', 'thats it'],
                    }
                    let hasVal = null;
                    for (let i in answers) {
                        if (answers[i].includes(textVal))
                            hasVal = i;
                    }
                    if (hasVal)
                        handleClick('yesnodk', hasVal, textVal);
                    // answerFun.answer(getBotProps(), question, val, textVal.split('').join(''));
                    else
                        addMsgArr([
                            {
                                text: textVal,
                                isUser: true
                            },
                            {
                                text: `I'm sorry I couldn't understand that.`,
                                isUser: false
                            },
                            {
                                text: `Please re-iterate.`,
                                isUser: false
                            },
                        ])
                    setTextVal('');
                }
                else {
                    const text = textValue ? textValue : val === 'present' ? 'Yes.' : val === 'absent' ? 'Nope.' : val === 'unknown' ? `I'm not sure.` : '';
                    answerFun.answer(getBotProps(), question, val, text);
                }
                break;
            case 'agegender':
                if (values.age && values.sex)
                    answerFun.submit(getBotProps());
                break;
            case 'diagnosis':
                if (val === 'close') {
                    setShowDiagnosis(false);
                }
                else if (val === 'results') {
                    setShowDiagnosis(true);
                }
                break;
            case 'text':
                if (val === 'send') {
                    const answers = {
                        done: ['results', 'tell me the results', 'done', 'im done', 'thats it', 'no', 'n', 'nope', 'negative'],
                    }
                    let hasVal = null;
                    for (let i in answers) {
                        if (answers[i].includes(textVal))
                            hasVal = i;
                    }
                    if (hasVal)
                        handleClick('text', hasVal);
                    else
                        answerFun.send(getBotProps(), textVal);
                    setTextVal('');
                }
                else if (val === 'done') {
                    answerFun.done(getBotProps());
                }
                break;
            default:
                break;
        }
    };

    const onEnterPress = (prop) => (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            if (!loading && textVal.length > 0)
                handleClick(prop, 'send');
        }
    }

    const handleDelete = (prop, id) => {
        setValues({
            ...values,
            symptoms: values.symptoms.filter((symptom) => { return symptom.id !== id; })
        });
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
                {/* <div className='header'>
                    <div className='body'>
                        <p className='title'>Symptoms</p>
                        <div className='symptoms'>
                            {values.symptoms && values.symptoms.map((symptom, idx) => {
                                return (<Chip key={symptom.id} label={symptom.name} onDelete={() => { handleDelete('symptoms', symptom.id) }} color="primary" className="chip" />)
                            })}
                        </div>
                    </div>
                </div> */}
                <div className='content' onClick={() => handleClick('chatbot')}>
                    <div className='body'>
                        <div className='messages'>
                            {
                                msgArr.map((msg, idx) => {
                                    return (
                                        <>
                                            {msg &&
                                                <>
                                                    <div key={idx} className={`message ${msg.isUser ? 'user' : 'cekon'}`}>
                                                        {
                                                            showIcon(msgArr, idx, msg) &&
                                                            <div className={`logo ${msg.isUser ? 'user' : 'cekon'}`}>
                                                                {userData && userData.userData &&
                                                                    msg.isUser ?
                                                                    <p>{userData.userData.username[0].toUpperCase()}</p> :
                                                                    msg.isUser ?
                                                                        <p>?</p> :
                                                                        <img src={require('../assets/doctor.png')} />
                                                                }
                                                            </div>
                                                        }
                                                        <div className={`box ${msg.isUser ? 'user' : 'cekon'}`}>
                                                            {msg.isFinal ?
                                                                <div className="text">
                                                                    {msg.text}
                                                                    <Button onClick={() => { handleClick('diagnosis', 'results') }}
                                                                        className="btn results"
                                                                        variant="contained"
                                                                        color="primary"
                                                                        disabled={loading}
                                                                    >
                                                                        results
                                                                    </Button>
                                                                </div> :
                                                                <div className="text">{msg.text}</div>
                                                            }
                                                        </div>
                                                    </div>
                                                    {
                                                        showIcon(msgArr, idx, msg) &&
                                                        <div className="spacer">
                                                        </div>
                                                    }
                                                </>
                                            }
                                        </>
                                    )
                                })
                            }
                            {loading &&
                                <div className={`message cekon`}>
                                    <div className={`logo cekon`}>
                                        <img src={require('../assets/doctor.png')} />
                                    </div>
                                    <div className={`box cekon`}>
                                        <p className="text"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></p>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="dummy" ref={dummyMsgRef}>
                            {values.symptoms.length > 0 &&
                                <>
                                    <p className='title'>Symptoms</p>
                                    <div className='symptoms'>
                                        {values.symptoms && values.symptoms.map((symptom, idx) => {
                                            if (symptom.choice_id === 'present' || !symptom.choice_id) {
                                                if (!symptom.disabled)
                                                    return (<Chip key={symptom.id} label={symptom.name} onDelete={() => { handleDelete('symptoms', symptom.id) }} color="primary" className="chip" />)
                                                else
                                                    return (<Chip key={symptom.id} label={symptom.name} color="primary" className="chip" />)
                                            }
                                            else
                                                return <></>
                                        })}
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    {answerType === 'yesno' ?
                        <div className='body yesno'>
                            <Button onClick={() => { handleClick('yesno', 'yes') }}
                                className="btn yes"
                                variant="contained"
                                color="primary"
                                disabled={loading || disabled}>
                                Yes
                            </Button>
                            <Button onClick={() => { handleClick('yesno', 'no') }}
                                className="btn no"
                                variant="outlined"
                                color="primary"
                                disabled={loading || disabled}>
                                No
                            </Button>
                        </div> :
                        answerType === 'yesnodk' ?
                            <div className='body yesnodk'>
                                <div className='btn-group'>
                                    <Button onClick={() => { handleClick('yesnodk', 'present') }}
                                        className="btn yes"
                                        variant="outlined"
                                        color="primary"
                                        disabled={loading || disabled}>
                                        Yes
                                    </Button>
                                    <Button onClick={() => { handleClick('yesnodk', 'absent') }}
                                        className="btn no"
                                        variant="outlined"
                                        color="primary"
                                        disabled={loading || disabled}>
                                        No
                                    </Button>
                                    <Button onClick={() => { handleClick('yesnodk', 'unknown') }}
                                        className="btn dk"
                                        variant="outlined"
                                        color="primary"
                                        disabled={loading || disabled}>
                                        Don't Know
                                    </Button>
                                </div>
                                <div className='text'>
                                    <TextareaAutosize
                                        className='textbox'
                                        rowsMax={4}
                                        onChange={handleChange('text')}
                                        value={textVal}
                                        onKeyDown={onEnterPress('yesnodk')}
                                        disabled={disabled}
                                        autofocus="true"
                                    />
                                    <Button
                                        onClick={() => { handleClick('yesnodk', 'send') }}
                                        className="btn send-btn"
                                        variant="outlined"
                                        color="primary"
                                        disabled={textVal.length < 1 || loading || disabled}>
                                        <img className="icon" src={(textVal.length < 1 || loading || disabled) ? require('../assets/arrowDisabled.svg') : require('../assets/arrow.svg')} />
                                    </Button>
                                </div>
                                <Button
                                    onClick={() => { handleClick('yesnodk', 'done') }}
                                    className="btn done-btn"
                                    variant="outlined"
                                    color="primary"
                                    disabled={values.symptoms.length < 1 || loading || disabled}>
                                    Tell me the results
                                </Button>
                            </div> :
                            answerType === 'agegender' ?
                                <div className='body agegender'>
                                    <TextInput label="Age" onChange={handleChange('age')} isAge={true} value={values.age ? values.age : ''} />
                                    <GenderInput onChange={handleChange('sex')} value={values.sex ? values.sex : ''} />
                                    <Button onClick={() => { handleClick('agegender') }} className="btn submit" variant="contained" color="primary">
                                        Submit
                                    </Button>
                                </div> :
                                <div className='body text'>
                                    <TextareaAutosize
                                        className='textbox'
                                        rowsMax={4}
                                        onChange={handleChange('text')}
                                        value={textVal}
                                        onKeyDown={onEnterPress('text')}
                                        disabled={disabled}
                                        autofocus="true"
                                    />
                                    <Button
                                        onClick={() => { handleClick('text', 'send') }}
                                        className="btn send-btn"
                                        variant="outlined"
                                        color="primary"
                                        disabled={textVal.length < 1 || loading || disabled}>
                                        <img className="icon"
                                            src={(textVal.length < 1 || loading || disabled) ? require('../assets/arrowDisabled.svg') : require('../assets/arrow.svg')} />
                                    </Button>
                                    <Button
                                        onClick={() => { handleClick('text', 'done') }}
                                        className="btn done-btn"
                                        variant="outlined"
                                        color="primary"
                                        disabled={values.symptoms.length < 1 || loading || disabled}>
                                        I'm Done Adding Symptoms
                                    </Button>
                                </div>
                    }
                </div>
                {showDiagnosis &&
                    <div className='full' onClick={(e) => {
                        handleClick('diagnosis', 'close');
                    }}>
                        <div className='body' onClick={(e) => { e.stopPropagation() }}>
                            <Result diagnosis={diagnosis} triage={triage} setInfoText={() => { }} />
                        </div>
                    </div>
                }
            </motion.div>
        </>
    )
}