import React, {useState, useEffect} from 'react'
import {UseForm, Form} from '../components/UseForm'
import {Grid} from '@material-ui/core'
import Controls from '../components/controls/Controls'
import { createAPIEndpoint, ENDPOINTS, workDayByDate} from '../api'

const initialFieldValues = {
    firstAndLastName:''
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

    const {values, setValues, handleInputChange} = UseForm(initialFieldValues);   
     return (
        <Form>
            <Grid container>
                <Grid item sm={6}>
                    <Controls.Input
                        name="firstAndLastName"
                        value={values.firstAndLastName}
                        label="First and Last Name"
                        onChange={handleInputChange}/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item sm={6}>
                    <Controls.DatePicker
                    name="date"
                    label="Date"
                    value={values.date}
                    onChange={handleInputChange}/>
                </Grid>     
                <Grid item sm={3}>
                    <Controls.Select
                    name="startHour"
                    label="Start Hour"
                    value={values.startHour}
                    onChange={handleInputChange}
                    options={startHour}/>
                </Grid>
                <Grid item sm={3}>
                    <Controls.Select
                    name="endHour"
                    label="End Hour"
                    value={values.endHour}
                    onChange={handleInputChange}
                    options={endHour}/>
                </Grid>
            </Grid>
        </Form>
    );
}
