import React from "react";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

export default function ({ onChange, value }) {

    return (
        <FormControl variant="outlined" className="sex-input input-field gender">
            <InputLabel id="select-outlined-label">Gender</InputLabel>
            <Select
                labelId="select-outlined-label"
                id="select-outlined"
                value={value}
                onChange={onChange}
                label="Gender"
            >
                <MenuItem value={''}></MenuItem>
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
            </Select>
        </FormControl>
    );
}
