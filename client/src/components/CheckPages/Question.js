import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/react-hooks';
import { DIAGNOSE_SYMPTOMS } from "../../schema";

export default function ({ setIsComplete, values, setValues, addSymptom }) {

    const [question, setQuestion] = useState(0);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    useEffect(() => {
        getQuestion();
        if (questionsAnswered > 2)
            setIsComplete(true);
        else
            setIsComplete(false);
    }, [questionsAnswered])

    const [Diagnose_Symptoms] = useMutation(DIAGNOSE_SYMPTOMS);
    const diagnoseSymptoms = async (diagnosis) => {
        try {
            const result = await Diagnose_Symptoms({
                variables: {
                    diagnosis
                }
            });
            console.log(result)
            setQuestion(result.data.diagnoseSymptoms.question);
        } catch (error) {
            console.log(error);
        }
    }

    const getQuestion = () => {
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
        });
    }

    const handleClick = (prop, id) => {
        switch (prop) {
            case 'answer':
                addSymptom({ ...question.items[0], choice_id: id });
                console.log(values);
                setQuestionsAnswered(questionsAnswered + 1);
                break;
            default:
                break;
        }
    };

    return (
        <div className="page-content questions">
            <p>{question.text}</p>
            <div className="btn-container">
                {
                    question.items && question.items[0] && question.items[0].choices &&
                    question.items[0].choices.map((choice) => {
                        return (
                            <Button key={choice.id} onClick={() => { handleClick('answer', choice.id) }} className={`btn ${choice.id}`} variant="contained" color="primary">
                                {choice.label}
                            </Button>
                        )
                    })
                }
            </div>
        </div>
    );
}