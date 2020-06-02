import React, { useEffect } from 'react';
import { GenderInput, TextInput } from '../';

export default function ({ setIsComplete, userData, values, setValues }) {

    useEffect(() => {
        if (userData && userData.userData) {
            const { userData: { age, sex } } = userData;
            const newValues = { ...values, age, sex };
            setValues(newValues);
        }
    }, [userData, setValues])

    useEffect(() => {
        console.log('aaaaa', values.sex)
        if (values.age && values.sex)
            setIsComplete(true);
        else
            setIsComplete(false);
    }, [values.age, values.sex, setIsComplete])

    const handleChange = (prop) => (event) => {
        const newValues = { ...values, [prop]: event.target.value };
        setValues(newValues);
    };

    return (
        <div className="page-content">
            <p>What's your age and gender?</p>
            <TextInput label="Age" onChange={handleChange('age')} isAge={true} value={values.age ? values.age : ''} />
            <GenderInput onChange={handleChange('sex')} value={values.sex ? values.sex : ''} />
        </div>
    );
}