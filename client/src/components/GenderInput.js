import React, { useState } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

export default function ({ onChange }) {

    const [gender, setGender] = useState('');

    const handleChange = (event) => {
        setGender(event.target.value);
        onChange(event);
    };

    return (
        <FormControl variant="outlined" className="gender-input input-field">
            <InputLabel id="select-outlined-label">Gender</InputLabel>
            <Select
                labelId="select-outlined-label"
                id="select-outlined"
                value={gender}
                onChange={handleChange}
                label="Gender"
            >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
            </Select>
        </FormControl>
    );
}
