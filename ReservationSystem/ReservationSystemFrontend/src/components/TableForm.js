import React, {useEffect, useState} from 'react'
import {UseForm, Form} from '../components/UseForm';
import {Grid, makeStyles, MenuItem, Input, FormControl, FormHelperText, InputLabel, TextField, FormControlLabel, TextareaAutosize, Checkbox} from '@material-ui/core';
import Controls from '../components/controls/Controls'
import InputAdornment from '@material-ui/core/InputAdornment';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import Notification from '../components/Notification'


const initialFieldValues = {
    id: 0,
    code: '',
    numberOfPeople: '',
    isActive: false
}


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    }
}));

export default function TableForm(props) {

    const {addOrEdit, table} = props;
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});

    const validate = () => {
        let temp = {}
        temp.code = values.code.length>=4?"":"Minimum 4 characters required"
        temp.numberOfPeople = values.numberOfPeople && values.numberOfPeople > 0 ? "":"Must be a positive number"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x=> x === "");
    }

    const {values, setValues, handleInputChange, errors, setErrors} = UseForm(initialFieldValues, false, validate);

    const handleCheckbox = (event) => {
        setValues({
            ...values,
            isActive: event.target.checked
        })
    }

    useEffect(() => {
        if(table != undefined && table){
            setValues( 
            {
                id: table.id,
                code: table.code,
                isActive: table.isActive,
                numberOfPeople: table.numberOfPeople
            });
        }
    }, [table])
    
    const resetForm = () => {
        let id = values.id
        if(id === 0){
            setNotify({isOpen:true, 'message':'Succesfully created', type:'success'});
            setValues(initialFieldValues)
            setErrors({})
        }
        else{
            setErrors({})
            setNotify({isOpen:true, 'message':'Succesfully updated', type:'success'});
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true);
        if(validate()){
            let body = {
                code:values.code,
                numberOfPeople:values.numberOfPeople,
                isActive:values.isActive
            } 
            if(values.id === 0)
            addOrEdit(body, resetForm, false)
            else
            addOrEdit(body, resetForm, true)
        }
        setLoading(false);
    }
    return (
        <>
        <Form onSubmit={handleSubmit}>
        <Grid container spacing={2} justify="space-between">
            <Grid item sm={5}>
            <Controls.Input
            label="Code"
            name="code"
            value={values.code}
            onChange={handleInputChange}
            error={errors.code}
            style={{width: "100%"}}
            />
            </Grid>
            <Grid item sm={4} container justify="center">
                <FormControlLabel
                name="isActive"
                checked={values.isActive == undefined? false: values.isActive}
                onChange={handleCheckbox}
                control={<Checkbox color="primary" />}
                label="Active"
                labelPlacement="end"
            />
            </Grid>
            <Grid item sm={3}>
             <FormControl className={classes.margin}>
                <InputLabel htmlFor="number-of-peple">Number of seats</InputLabel>
                <Input
                id="number-of-people"
                name="numberOfPeople"
                startAdornment={
                    <InputAdornment position="start">
                    <PeopleAltTwoToneIcon />
                    </InputAdornment>
                }
                type="number"
                value={values.numberOfPeople}
                onChange={handleInputChange}
                />
                {errors.numberOfPeople && <FormHelperText color="#DC143C">{errors.numberOfPeople}</FormHelperText>}
            </FormControl>
            </Grid>   
        </Grid>
        <Grid container justify="flex-end">
            <Controls.Button
            style={{ marginTop: "2em", width: "100%"}}
            variant="contained"
            disabled={loading}
            color="primary"
            size="large"
            text={values.id === 0?"create":"update"}
            type="submit"/>
        </Grid>
        </Form>
        <Notification
        notify={notify}
        setNotify={setNotify}
        />
        </>
    )
}
