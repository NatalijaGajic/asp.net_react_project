import React from 'react'
import {FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio
} from "@material-ui/core"

export default function RadioGroup(props) {
    const {name, label, value, onChange, items} = props;
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup 
            row={true}
            value={value}
            onChange={onChange}
            name={name}>
                {
                    items.map(
                    (item, index) => (
                    <FormControlLabel key={item.id} value={item.id} control={<Radio/>} label={item.title}/>

                     )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    )
}
