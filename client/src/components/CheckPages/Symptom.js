import React, { useState, useEffect } from 'react';
import { throttle, debounce } from "throttle-debounce";
import { TextInput } from '../';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

export default function ({ setIsComplete }) {

    const autocompleteSearch = q => {
        // _fetch(q);
        console.log(q);
    };

    const [values, setValues] = useState({
        age: null,
        gender: null,
        symptoms: [
            {
                "id": "s_331",
                "label": "nose congestion"
            },
            {
                "id": "s_107",
                "label": "Runny nose"
            },
            {
                "id": "s_1429",
                "label": "Nosebleeds"
            },
            {
                "id": "s_252",
                "label": "nose tingly"
            },
            {
                "id": "s_1436",
                "label": "pain around nose"
            },
            {
                "id": "s_531",
                "label": "Frequent runny nose, cough"
            },
            {
                "id": "s_230",
                "label": "Rash on face covering only the cheeks and the nose"
            },
            {
                "id": "s_524",
                "label": "Polyps in nose"
            },
            {
                "id": "s_1232",
                "label": "Double vision while looking down and toward the nose"
            },
            {
                "id": "s_1240",
                "label": "difficulty looking at nose"
            },
            {
                "id": "s_1605",
                "label": "Nose pain"
            },
            {
                "id": "s_2017",
                "label": "Nosebleeds, recurrent"
            },
            {
                "id": "s_2016",
                "label": "Nosebleed, single episode"
            },
            {
                "id": "s_1996",
                "label": "nose swelling"
            },
            {
                "id": "s_1100",
                "label": "Transverse furrow on the nose"
            },
            {
                "id": "s_1548",
                "label": "Pseudomembrane in throat or nose"
            }
        ],
        commonSymptoms: [
            {
                "id": "s_331",
                "label": "nose congestion",
            },
        ],
        search: '',
        searchSymptoms: '',
        searchDebounced: debounce(500, autocompleteSearch)
    });

    useEffect(() => {
        if (values.symptoms.length > 0)
            setIsComplete(true);
        else
            setIsComplete(false);
    }, [values.symptoms, setIsComplete])

    useEffect(() => {
        values.searchDebounced(values.search);
    }, [values.search])

    const changeQuery = event => {
        setValues({ ...values, search: event.target.value });
    };

    const handleDelete = (prop, id) => {
        let commonSymptoms = [...values.commonSymptoms]
        if (values['commonSymptoms'].find(symptom => symptom.id === id))
            commonSymptoms = [...values.commonSymptoms, values['commonSymptoms'].find(symptom => symptom.id === id).chosen = false];
        setValues({
            ...values,
            symptoms: values.symptoms.filter((symptom) => { return symptom.id !== id; }),
            commonSymptoms
        });
    };

    const handleClick = (prop, id) => {
        switch (prop) {
            case 'commonSymptoms':
                setValues({
                    ...values,
                    symptoms: [...values['symptoms'], values['commonSymptoms'].find(symptom => symptom.id === id)],
                    commonSymptoms: [...values['commonSymptoms'], values['commonSymptoms'].find(symptom => symptom.id === id).chosen = true]
                });
                break;
            default:
                break;
        }
    };

    return (
        <div className="page-content symptom">
            <div className="picker">
                <p>What are your symptoms?</p>
                <TextInput label="Symptom" onChange={changeQuery} />
                <Button className="btn" variant="outlined" color="primary">
                    Add Symptom
                </Button>
                <p>Or choose common symptoms</p>
                <div className="symptoms">
                    {values.commonSymptoms && values.commonSymptoms.map((symptom, idx) => {
                        if (symptom && symptom.id) {
                            if (symptom.chosen)
                                return (<Chip key={idx} label={symptom.label} onDelete={() => { handleDelete('commonSymptoms', symptom.id) }} className="chip" />)
                            else
                                return (<Chip key={idx} label={symptom.label} onClick={() => { handleClick('commonSymptoms', symptom.id) }} color="primary" variant="outlined" className="chip" />)
                        }
                        else
                            return <></>
                    })}
                </div>
            </div>
            <div className="list">
                <p>Symptoms</p>
                <div className="symptoms">
                    {values.symptoms && values.symptoms.map((symptom, idx) => {
                        return (<Chip key={idx} label={symptom.label} onDelete={() => { handleDelete('symptoms', symptom.id) }} color="primary" className="chip" />)
                    })}
                </div>
            </div>
        </div>
    );
}