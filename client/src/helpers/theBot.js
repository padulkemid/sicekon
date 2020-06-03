const data = {
    1: {
        loggedIn: [
            {
                text: `We've located your account data.`,
                isUser: false
            },
            {
                text: `Is this data correct?`,
                isUser: false
            },
        ],
        notLoggedIn: [
            {
                text: `We couldn't find your account.`,
                isUser: false
            },
            {
                text: `To make things easier for next time, I recommend you create an account.`,
                isUser: false
            },
        ]
    },
    newData: [
        {
            text: `What's your age?`,
            isUser: false
        },
        {
            text: `What's your gender?`,
            isUser: false
        },
    ],
    start: [
        {
            text: `Awesome!`,
            isUser: false
        },
        {
            text: `Let's start.`,
            isUser: false
        },
    ],
    symptom: [
        {
            text: `What's the problem?`,
            isUser: false
        },
    ],
    noSymptom: [
        {
            text: `I'm sorry I couldn't understand that.`,
            isUser: false
        },
        {
            text: `Can you please re-iterate?`,
            isUser: false
        },
    ],
    foundSymptom: [
        {
            text: `Okay, I understand you have some REPLACE.`,
            isUser: false
        },
        {
            text: `Alright, REPLACE.`,
            isUser: false
        },
        {
            text: `I see, some REPLACE.`,
            isUser: false
        },
    ],
    whatElse: [
        {
            text: `Anything else?`,
            isUser: false
        },
        {
            text: `What else?`,
            isUser: false
        },
        {
            text: `Do you feel anything else?`,
            isUser: false
        },
        {
            text: `Is there anything else?`,
            isUser: false
        },
        {
            text: `Are there any other problems?`,
            isUser: false
        },
    ],
    already: [
        {
            text: `It seems you've already said that.`,
            isUser: false
        },
        {
            text: `I think I already heard that.`,
            isUser: false
        },
    ]
}

const fun = {
    resetArr({ setMsgArr }) {
        setMsgArr([]);
    },
    sendFirst(props) {
        const { userData } = props;
        if (userData && userData.userData) {
            fun.sendConfirmUserData({ ...props, msgArr: [data['1'].loggedIn[0]] });
        }
        else {
            fun.sendGetUserData({ ...props, msgArr: [...data['1'].notLoggedIn] });
        }
        // fun.sendGetUserData(props);
    },
    sendGetUserData(props) {
        const { setMsgArr, msgArr, setAnswerType, setAnswerFun } = props;
        const newMessage = {
            text: `What's your age and gender?`,
            isUser: false,
        };
        setMsgArr([...msgArr, newMessage]);
        setAnswerType('agegender');
        setAnswerFun({
            submit(props) {
                const { msgArr, setValues, values, userData } = props;
                const newMessage = {
                    text: `I am ${values.sex} and ${values.age} years of age.`,
                    isUser: true,
                };
                fun.start({ ...props, msgArr: [...msgArr, newMessage] });
            },
        })
    },
    sendConfirmUserData(props) {
        const { setMsgArr, msgArr, userData, setAnswerType, setAnswerFun } = props;
        const newMessage = {
            text: `Are you ${userData.userData.sex} and ${userData.userData.age} years of age?`,
            isUser: false,
        };
        setMsgArr([...msgArr, newMessage]);
        setAnswerType('yesno');
        setAnswerFun({
            yes(props) {
                const { msgArr, setValues, values } = props;
                setValues({ ...values, age: userData.userData.age, sex: userData.userData.sex });
                const newMessage = {
                    text: `Yes`,
                    isUser: true,
                };
                fun.start({ ...props, msgArr: [...msgArr, newMessage] });
            },
            no(props) {
                const { msgArr } = props;
                const newMessage = {
                    text: `No`,
                    isUser: true,
                };
                fun.sendGetUserData({ ...props, msgArr: [...msgArr, newMessage] });
            }
        })
    },
    start(props) {
        const { msgArr } = props;
        fun.getSymptoms({ ...props, msgArr: [...msgArr, ...data.start] })
    },
    getSymptoms(props) {
        const { setMsgArr, msgArr, setAnswerType, setAnswerFun } = props;
        setMsgArr([...msgArr, ...data.symptom]);
        setAnswerType('text');
        setAnswerFun({
            send(props, value) {
                const { addMsgArr, chat } = props;
                const newMessage = {
                    text: value,
                    isUser: true,
                };
                addMsgArr([newMessage])
                chat(value);
            },
            done(props, lastText) {
                const { addMsgArr, getQuestion } = props;
                const newMessage = {
                    text: `That's it.`,
                    isUser: true,
                };
                addMsgArr([newMessage])
                getQuestion(newMessage);
                fun.getQuestions(props);
                // setAnswerType('yesnodk');
            },
        })
    },
    getQuestions(props) {
        const { setMsgArr, msgArr, setAnswerType, setAnswerFun } = props;
        // addMsgArr([...data.symptom]);
        setAnswerType('yesnodk');
        setAnswerFun({
            answer(props, question, choice_id, choice) {
                const { addMsgArr, addSympArr, setQuestionsAnswered, questionsAnswered, getQuestion } = props;
                setQuestionsAnswered(questionsAnswered + 1);
                const newMessage = {
                    text: choice,
                    isUser: true,
                };
                addMsgArr([newMessage]);
                addSympArr([{ ...question.items[0], choice_id }])
                // getQuestion(newMessage);
                // fun.start({ ...props, msgArr: [...msgArr, newMessage] });
            },
            done(props, lastText) {
                const { addMsgArr, getQuestion, setAnswerType } = props;
                const newMessages = [
                    {
                        text: `That's it.`,
                        isUser: true,
                    },
                    {
                        text: `Alright, I've compiled your results.`,
                        isUser: false,
                        isFinal: true,
                    }
                ];
                addMsgArr(newMessages);

            },
        })
    },
    sendSymptoms(props, result, sentText) {
        console.log(result);
        const newMessage = {
            text: sentText,
            isUser: true,
        };
        const { setMsgArr, msgArr, addMsgArr, setAnswerFun, values, setValues } = props;
        const { obvious, mentions } = result.data.chatFinalResponse;
        if (mentions.length > 0) {
            // if (obvious) {
            // console.log(fun.getFormattedSymptoms(mentions))
            const rand = [Math.floor(Math.random() * data.foundSymptom.length), Math.floor(Math.random() * data.whatElse.length)]
            let found = { ...data.foundSymptom[rand[0]] };
            found = { ...found, text: found.text.replace('REPLACE', fun.getFormattedSymptoms(mentions)) };
            const whatElse = { ...data.whatElse[rand[1]] };

            setValues({ ...values, symptoms: [...values.symptoms, ...fun.getArraySymptoms(values.symptoms, mentions)] })
            addMsgArr([newMessage, found, whatElse]);

            // }
            // else {

            // }
        }
        else {
            addMsgArr([newMessage, ...data.noSymptom]);
        }
        // addMsgArr([...data.symptom]);
        // setAnswerType('text');
        // setAnswerFun({
        //     send(props, value) {
        //         const { msgArr, setMsgArr, chat } = props;
        //         const newMessage = {
        //             text: value,
        //             isUser: true,
        //         };
        //         addMsgArr([newMessage])
        //         chat(value);
        //     },
        // })
    },
    sendUserData({ setMsgArr, msgArr, userData }) {
        setMsgArr([...msgArr]);
    },
    getFormattedSymptoms(mentions) {
        let formattedSymptoms = '';
        for (let i in mentions) {
            if (0 === Number(i)) {
                formattedSymptoms += mentions[i].common_name.toLowerCase();
            }
            else if (mentions.length - 1 !== Number(i)) {
                formattedSymptoms += `, ${mentions[i].common_name.toLowerCase()}`;
            }
            else {
                formattedSymptoms += `, and ${mentions[i].common_name.toLowerCase()}`;
            }
        }
        return formattedSymptoms;
    },
    getArraySymptoms(currentSymptoms, mentions) {
        let symptoms = [];
        for (let i in mentions) {
            const { name, id, choice_id } = mentions[i];
            let isAdded = false;
            for (let j in currentSymptoms) {
                console.log(currentSymptoms[j].id, id);
                if (currentSymptoms[j].id === id)
                    isAdded = true;
            }
            if (!isAdded)
                symptoms.push({ name, id, choice_id })
        }
        return symptoms;
    },
}
export default {
    data,
    fun
}