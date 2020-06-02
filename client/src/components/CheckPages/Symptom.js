import React, { useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import Search from './Search';

export default function ({ setIsComplete, values, setValues, addSymptom }) {

    useEffect(() => {
        if (values.symptoms && values.symptoms.length > 0)
            setIsComplete(true);
        else
            setIsComplete(false);
    }, [values.symptoms, setIsComplete])

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
                let symptoms = [];
                let commonSymptoms = [];
                if (values.symptoms) {
                    symptoms = [...values.symptoms];
                }
                if (values.commonSymptoms) {
                    commonSymptoms = [...values.commonSymptoms];
                }
                symptoms.push(commonSymptoms.find(symptom => symptom.id === id));
                commonSymptoms.push(commonSymptoms.find(symptom => symptom.id === id).chosen = true);
                const newValues = { ...values, symptoms, commonSymptoms }
                setValues(newValues);
                break;
            default:
                break;
        }
    };

    return (
        <div className="page-content symptom">
            <div className="picker">
                <p>What are your symptoms?</p>
                <Search values={values} addSymptom={addSymptom} />
                <p className="common-symp">Or choose common symptoms</p>
                <div className="symptoms">
                    {values.commonSymptoms && values.commonSymptoms.map((symptom, idx) => {
                        return (<div key={idx}>
                            {
                                symptom && symptom.id ?
                                    symptom.chosen ?
                                        <Chip label={symptom.label} onDelete={() => { handleDelete('commonSymptoms', symptom.id) }} className="chip" />
                                        :
                                        <Chip label={symptom.label} onClick={() => { handleClick('commonSymptoms', symptom.id) }} color="primary" variant="outlined" className="chip" />
                                    : <></>
                            }
                        </div>)
                    })}
                </div>
            </div>
            <div className="list">
                <p>Symptoms</p>
                <div className="symptoms">
                    {values.symptoms && values.symptoms.map((symptom, idx) => {
                        return (<Chip key={symptom.id} label={symptom.label} onDelete={() => { handleDelete('symptoms', symptom.id) }} color="primary" className="chip" />)
                    })}
                </div>
            </div>
        </div>
    );
}