import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';

export default function ({ onChange, label, isAge }) {

    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
        onChange(event);
    };

    return (
        <TextField className="input-field" id="outlined-basic"
            type={isAge ? 'number' : 'text'} label={label} value={text} onChange={handleChange} variant="outlined" />
    );
}
