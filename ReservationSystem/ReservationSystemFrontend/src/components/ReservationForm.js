import React, {useState, useEffect} from 'react'
import {UseForm, Form} from '../components/UseForm'
import {Grid} from '@material-ui/core'
import Controls from '../components/controls/Controls'
import { createAPIEndpoint, ENDPOINTS, workDayByDate} from '../api'

const initialFieldValues = {
    firstAndLastName:'',
    startHour:0,
    endHour:0,
    date: new Date()
}

export default function ReservationForm() {
    const [startHour, setStartHour] = useState([]);
    const [endHour, setEndHour] = useState([]);

    function range(size, startAt) {
        let array = [...Array(size).keys()].map(i => {
            let item = {
                id: i,
                title:(i + startAt)
            }
            return item;
        });
        console.log(array);
        return array;
    }

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.WORK_DAYS).fetchById("609a5f65525f3f3a483b9f84")
        .then(res => {
            console.log(res);
            let start = res.data.workDayScheme.startHour;
            let end = res.data.workDayScheme.endHour;
            let size = end - start;
            setStartHour(range(size, start));
            setEndHour(range(size, start));
            console.log(startHour);
            console.log(endHour);
        })
        .catch(err => console.log(err))
    }, []);

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('firstAndLastName' in fieldValues)
            temp.firstAndLastName = fieldValues.firstAndLastName?"":"This field is required"
        if('startHour' in fieldValues)
            temp.startHour = fieldValues.startHour.length !=0?"":"This field is required"
        if('endHour' in fieldValues)
            temp.endHour = fieldValues.endHour.length != 0?"":"This field is required"
        if('endHour' in fieldValues)
            temp.endHour = fieldValues.startHour<fieldValues.endHour?"":"Value must be greater than start hour"
        if('date' in fieldValues)
            temp.date = fieldValues.date != null?"":"This field is required"
        setErrors({
            ...temp
        })
        //Only returns when validate is called from handleSubmit:
        if(fieldValues == values)
            return Object.values(temp).every(x=> x == "");
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(!validate())
            window.alert('Testing');
    }

    const {values, setValues, handleInputChange,  errors, setErrors} = UseForm(initialFieldValues, true, validate);   
     return (
       <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item sm={6}>
                    <Controls.Input
                        name="firstAndLastName"
                        value={values.firstAndLastName}
                        label="First and Last Name"
                        onChange={handleInputChange}
                        error={errors.firstAndLastName}/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item sm={6}>
                    <Controls.DatePicker
                    name="date"
                    label="Date"
                    value={values.date}
                    onChange={handleInputChange}
                    error={errors.date}
                    />
                </Grid>     
                <Grid item sm={3}>
                    <Controls.Select
                    name="startHour"
                    label="Start Hour"
                    value={values.startHour}
                    onChange={handleInputChange}
                    options={startHour}
                    error={errors.startHour}/>
                </Grid>
                <Grid item sm={3}>
                    <Controls.Select
                    name="endHour"
                    label="End Hour"
                    value={values.endHour}
                    onChange={handleInputChange}
                    options={endHour}
                    error={errors.endHour}/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item sm={9}></Grid>
                <Grid container sm={3} alignItems="center" justify="center">
                    <Controls.Button
                    variant="contained"
                    color="primary"
                    size="large"
                    text="submit"
                    type="submit"/>

                </Grid>
            </Grid>
        </Form>
    );
}
