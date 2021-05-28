import React from 'react'
import {TextField} from "@material-ui/core"

export default function InputDisabled(props) {
    const {name, value, label, ...other} = props;
    return (
        <TextField
        variant="outlined"
        label={label}
        name={name}
        value={value}
        disabled
        {...other}
        />
    )
}
