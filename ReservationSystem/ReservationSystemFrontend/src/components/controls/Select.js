import React from 'react'
import {FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect} from '@material-ui/core'

export default function Select(props) {
    const {name, label, value, onChange, options, error=null, displayNone = true, ...other} = props;
    return (
        <FormControl variant="outlined"
        {...other}
        {...(error && {error:true, helperText:error})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
            name={name}
            value={value}
            onChange={onChange}
            >
                {displayNone && <MenuItem value="">None</MenuItem>
                }
                {
                    options.map(
                        item => <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
