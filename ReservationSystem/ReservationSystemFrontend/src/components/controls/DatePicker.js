import React from 'react'
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

export default function DatePicker(props) {
    const {name, label, value, onChange, error=null, ...other} = props;

    const convertToDefEventPara = (name, value) => ({
        target:{
            name, value
        }
    });
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
            label={label}
            //format="MMM/dd/yyyy"
            format="yyyy-MM-dd"
            name={name}
            value={value}
            {...(error && {error:true, helperText:error})}
            onChange={date => onChange(convertToDefEventPara(name, date))}
            {...other}/>
        </MuiPickersUtilsProvider>
    )
}
