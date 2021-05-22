import React from 'react'
import {TextField} from "@material-ui/core"

export default function Input(props) {
    const {name, value, label, onChange, error=null, ...other} = props;
    return (
        <TextField
        variant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...(error && {error:true, helperText:error})}
        {...other}
        />
    )
}
