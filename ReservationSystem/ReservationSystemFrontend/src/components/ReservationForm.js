import React, {useState, useEffect} from 'react'
import {UseForm, Form} from '../components/UseForm'
import {Grid} from '@material-ui/core'
import Controls from '../components/controls/Controls'
import { createAPIEndpoint, ENDPOINTS, workDayByDate} from '../api'
import ReservationGamesList from './ReservationGamesList'
import ReservationTablesList from './ReservationTablesList'
import PaperForm from '../components/PaperForm';


const initialFieldValues = {
    firstAndLastName:'',
    startHour:0,
    endHour:0,
    date: new Date(),
    startHours:[],
    endHours:[]
}

export default function ReservationForm() {
    const [isSbmitted, setSubmitted] = useState(false);

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
    
    const {values, setValues, handleInputChange,  errors, setErrors} = UseForm(initialFieldValues, true, validate);   

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
        //Thu May 20 2021 14:46:31 GMT+0200 (Central European Summer Time) POST should get local time
        var localDate = new Date(values.date);
        //The value returned by getMonth is an integer between 0 and 11 corresponding to the month
        let year = localDate.getFullYear().toString();
        let month = (localDate.getMonth()+1).toString();
        let day = localDate.getDate().toString();
        let date = year+'-'+month+'-'+day;
        console.log(date);
        workDayByDate(date).fetch()
        .then(res => {
            console.log('Fetching work day scheme');
            if(res.data == undefined || res.data==''){
                setValues({
                    ...values,
                    startHours:[],
                    endHours:[]
                });
            } else {
                let start = res.data.workDayScheme.startHour;
                let end = res.data.workDayScheme.endHour;
                let size = end - start;
                setValues({
                    ...values,
                    startHours:range(size, start),
                    endHours:range(size, start)
                });
            }
            
        })
        .catch(err => {
            //Gets a bad request if there is no work day with a date 
            console.log(err);
            setValues({
                ...values,
                startHours:[],
                endHours:[]
            });
        });
       /* createAPIEndpoint(ENDPOINTS.WORK_DAYS).fetchById("609a5f65525f3f3a483b9f84")
        .then(res => {
            console.log('Fetching work day scheme');
            let start = res.data.workDayScheme.startHour;
            let end = res.data.workDayScheme.endHour;
            let size = end - start;
            //setStartHour(range(size, start));
            //setEndHour(range(size, start));
            setValues({
                ...values,
                startHours:range(size, start),
                endHours:range(size, start)
            })
        })
        .catch(err => console.log(err))*/
    }, [values.date]); //when date is changed fetch new work day scheme

    const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
            window.alert('Testing');
            setSubmitted(true); 
        }
    }

     return (
        <div>
        <PaperForm>
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
                    options={values.startHours}
                    error={errors.startHour}/>
                </Grid>
                <Grid item sm={3}>
                    <Controls.Select
                    name="endHour"
                    label="End Hour"
                    value={values.endHour}
                    onChange={handleInputChange}
                    options={values.endHours}
                    error={errors.endHour}/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item sm={9}></Grid>
                <Grid item sm={3} >
                    <Grid container alignItems="center" justify="center">
                        <Controls.Button
                        variant="contained"
                        color="primary"
                        size="large"
                        text="submit"
                        type="submit"/>

                    </Grid>
                </Grid>
            </Grid>
        </Form>
        </PaperForm>
        <PaperForm>
            <Form>
                <Grid container>
                    <Grid item sm={6}>
                        <ReservationGamesList></ReservationGamesList>
                    </Grid>
                    <Grid item sm={6}>
                        <ReservationTablesList></ReservationTablesList>
                    </Grid>
                </Grid>
            </Form>
        </PaperForm>
        </div>
    );
}
