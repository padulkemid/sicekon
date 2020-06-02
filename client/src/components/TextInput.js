import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';

export default function ({ onChange, label, isAge, value }) {
    return (
        <TextField className="input-field" id="outlined-basic"
            type={isAge ? 'number' : 'text'} label={label} value={value} onChange={onChange} variant="outlined" />
    );
}
