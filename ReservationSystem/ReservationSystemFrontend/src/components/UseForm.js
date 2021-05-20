import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core'


const useStyle = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root':{
            width: '80%',
            margin: theme.spacing(1)
        }

    }
}));

export function UseForm(initialFieldValues, validateOnChange=false, validate) {
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e=> {
        const {name, value} = e.target
        console.log(name);
        console.log(value);
        setValues({
            ...values,
            [name]:value
        }) 
    }
    return {
        values,
        setValues, 
        handleInputChange,
        errors,
        setErrors
    }
}

 export function Form(props) {
    const classes = useStyle();
    const {children, ...other} = props;
    //autoComplete="off"
     return (
        <form className={classes.root} {...other}>
             {props.children}
         </form>
     )
 }