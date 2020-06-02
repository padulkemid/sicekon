import React, { useState, useEffect } from 'react';
import { GenderInput, TextInput } from '../';

export default function ({ setIsComplete }) {

    const [values, setValues] = useState({
        age: null,
        gender: null,
    });

    useEffect(() => {
        if (values.age && values.gender)
            setIsComplete(true);
        else
            setIsComplete(false);
    }, [values.age, values.gender, setIsComplete])

    const handleChange = (prop) => (event) => {
        const newValues = { ...values, [prop]: event.target.value };
        setValues(newValues);
        console.log(newValues);
    };

    return (
        <div className="page-content">
            <p>What's the patient's age and gender?</p>
            <TextInput label="Age" onChange={handleChange('age')} isAge={true} />
            <GenderInput onChange={handleChange('gender')} />
        </div>
    );
}