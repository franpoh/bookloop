import React from "react";
// import { TextField, Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function ComboBox(props) {
    return (
        <Autocomplete
            disablePortal                   // no clue
            getOptionLabel={(option) => option.name}
            options={props.options}         //attempting understanding
            sx={{width: 300}}
            renderInput= {(params) => <TextField {...params} label="Genre"/>}
        />
    );
}

export default ComboBox();