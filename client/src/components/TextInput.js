import React from "react";
import TextField from '@material-ui/core/TextField';

export default function (props) {
    const { isAge } = props;
    return (
        <TextField {...props} className="input-field" id="outlined-basic"
            type={isAge ? 'number' : 'text'} variant="outlined" />
    );
}
