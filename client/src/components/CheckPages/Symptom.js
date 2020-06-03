import React, { useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import Search from './Search';

export default function ({ setIsComplete, values, setValues, addSymptom, setInfoText }) {

    useEffect(() => {
        if (values.symptoms && values.symptoms.length > 0) {
            setIsComplete(true);
            setInfoText('Add more symptoms for better accuracy!');
        }
        else {
            setIsComplete(false);
        }
    }, [values.symptoms, setIsComplete])

    const handleDelete = (prop, id) => {
        setValues({
            ...values,
            symptoms: values.symptoms.filter((symptom) => { return symptom.id !== id; })
        });
    };

    const handleClick = (prop, id) => {
        switch (prop) {
            case 'commonSymptoms':
                let symptoms = [];
                if (values.symptoms) {
                    symptoms = [...values.symptoms];
                }
                symptoms.push(values.commonSymptoms.find(symptom => symptom.id === id));
                const newValues = { ...values, symptoms }
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
                    {values.commonSymptoms && values.commonSymptoms.map((commSymp, idx) => {
                        return (<div key={idx}>
                            {
                                commSymp && commSymp.id ?
                                    values.symptoms.findIndex(sym => sym.id === commSymp.id) < 0 ?
                                        <Chip label={commSymp.name} onClick={() => { handleClick('commonSymptoms', commSymp.id) }} color="primary" variant="outlined" className="chip" />
                                        :
                                        <Chip label={commSymp.name} onDelete={() => { handleDelete('commonSymptoms', commSymp.id) }} className="chip" />
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
                        return (<Chip key={symptom.id} label={symptom.name} onDelete={() => { handleDelete('symptoms', symptom.id) }} color="primary" className="chip" />)
                    })}
                </div>
            </div>
        </div>
    );
}