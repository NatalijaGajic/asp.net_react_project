import React, {useState, useEffect} from 'react'
import {UseForm, Form} from '../components/UseForm'
import {Grid} from '@material-ui/core'
import Controls from '../components/controls/Controls'
import { workDayByDate, createAPIEndpoint, ENDPOINTS} from '../api'
import PaperForm from '../components/PaperForm';
import GamesAndTablesForm from '../components/GamesAndTablesForm'

//const userId = "6072e15c7636626e81ac21fb"; //3 penalties
//const userId = "6072e13b7636626e81ac21fa";

const initialFieldValues = {
    firstAndLastName:'',
    startHour:0,
    endHour:0,
    date: new Date(),
    startHours:[],
    endHours:[],
    game: {name:''},
    table: {code:''},
    workDayId:''
}


export default function ReservationForm() {
    //const [isSubmitted, setSubmitted] = useState(false);
    const [queryParams, setQueryParams] = useState({workDayId:'', startHour:0, endHour:0});
    const [postBody, setPostBody] = useState({
        firstAndLastName: '',
        startHour: 0,
        endHour: 0,
        hours: 0,
        numberOfPeople: 0,
        account: {},
        game: {name: ''},
        table: {code: ''},
        workDayId:''});
    
    //const [workDayId, setWorkDayId] = useState(''); //can be changed but if its not clicked search shouldn't be changed
    const [date, setDate] = useState(new Date()); //because of useEffect, so it doesnt loop
    const [submitDate, setSubmitDate] = useState(new Date()); 
    //const [firstAndLastName, setFirstAndLastName] = useState('');

    const validate = (fieldValues = values) => {
        console.log('in validate:');
        let temp = {...errors}
        if('firstAndLastName' in fieldValues)
            temp.firstAndLastName = fieldValues.firstAndLastName?"":"This field is required"
        if('startHour' in fieldValues)
            temp.startHour = fieldValues.startHour.length !== 0?"":"This field is required"
        if('endHour' in fieldValues)
            temp.endHour = fieldValues.endHour.length !== 0?"":"This field is required"
        if('endHour' in fieldValues) //values. startHour -> when validating onChange endHour startHour is undefined
            temp.endHour = values.startHour<fieldValues.endHour?"":"Value must be greater than start hour"
        if('date' in fieldValues)
            temp.date = fieldValues.date !== null?"":"This field is required"
        setErrors({
            ...temp
        })
        //Only returns when validate is called from handleSubmit:
        if(fieldValues === values)
            return Object.values(temp).every(x=> x === "");
    }
    
    const handleInputChangeDatePicker = e => {
        console.log('handleInputChangeDatePicker');
        handleInputChange(e);
        let date = getStringDate(values.date);
        console.log(date);
        setDate(date);
    }

    const {values, setValues, handleInputChange,  errors, setErrors} = UseForm(initialFieldValues, true, validate);   

    function range(size, startAt) {
        let array = [...Array(size).keys()].map(i => {
            let item = {
                id: (i + startAt),
                title:(i + startAt)
            }
            return item;
        });
        console.log(array);
        return array;
    }

    const getStringDate = datePickerDate => {
        //The value returned by getMonth is an integer between 0 and 11 corresponding to the month
        var localDate = new Date(datePickerDate);
        let year = localDate.getFullYear().toString();
        let month = (localDate.getMonth()+1).toString();
        let day = localDate.getDate().toString();
        let date = year+'-'+month+'-'+day;
        return date;
    }

    useEffect(() => {
        //Thu May 20 2021 14:46:31 GMT+0200 (Central European Summer Time) POST should get local time
        let date = getStringDate(values.date);
        console.log(date);
        workDayByDate(date).fetch()
        .then(res => {
            console.log('Fetching work day scheme');
            if(res.data === undefined || res.data === ''){
                setValues({
                    ...values,
                    startHours:[],
                    endHours:[]
                });
            } else {
                let start = res.data.workDayScheme.startHour;
                let end = res.data.workDayScheme.endHour;
                let size = end - start;
                let array = range(size, start)
                setValues({
                    ...values,
                    startHours:array,
                    endHours:array,
                    workDayId: res.data.id,
                    date:date
                });
                //setWorkDayId(res.data.id);
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
    }, [date]); //when date is changed fetch new work day scheme, it its values.date loop

    const handleSearch = e => {
        e.preventDefault()
        if(validate()){
            window.alert('Valid form');
            //setQueryParams, queryParams are props and triggers onEffect in ReservationGamesList component
            setQueryParams({
                startHour:values.startHour,
                endHour:values.endHour,
                workDayId:values.workDayId
            });
            setValues({
                ...values,
                game:{name:''},
                table:{code:''}
            })
            /*let date = getStringDate(values.date);
            console.log(date);
            setDate(date);*/
            setPostBody({
                firstAndLastName: values.firstAndLastName,
                startHour: values.startHour,
                endHour: values.endHour,
                hours: values.endHour - values.startHour,
                numberOfPeople: 0,
                account: {},
                game: values.game,
                table: values.table,
                workDayId: values.workDayId
            })
            setSubmitDate(values.date);
        }
    }

    //TODO: double click on submit shouldn't be allowed
    const handleSubmit = e => {
        e.preventDefault();
        //TODO: check penalties
        if(validate() && values.game.name !== '' && values.table.code !== ''){
            window.alert('Valid form');
            createAPIEndpoint(ENDPOINTS.RESERVATIONS).create(
                {
                    account: {},
                    game: values.game,
                    table: values.table,
                    firstAndLastName: postBody.firstAndLastName,
                    startHour: postBody.startHour,
                    endHour: postBody.endHour,
                    hours: postBody.endHour - postBody.startHour,
                    numberOfPeople: 0,
                    workDayId: postBody.workDayId
                  }
            ).then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        }

    }

    const chooseGame = game => {
        console.log(game);
        setValues({
            ...values,
            game:game
        });
    }

    const chooseTable = table => {
        console.log(table);
        setValues({
            ...values,
            table:table
        })
    }

     return (
        <div>
        <PaperForm>
       <Form onSubmit={handleSearch}>
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
                    onChange={handleInputChangeDatePicker}
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
                        text="search"
                        type="submit"/>

                    </Grid>
                </Grid>
            </Grid>
        </Form>
        </PaperForm>
        <GamesAndTablesForm
        {... {queryParams, setQueryParams, chooseGame, chooseTable}}/>
        <PaperForm >
            <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item sm={6}>
                    <Controls.InputDisabled
                        name="firstAndLastNameDisabled"
                        value={postBody.firstAndLastName}
                        label="First and Last Name"/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item sm={6}>
                    <Controls.InputDisabled
                    name="dateDisabled"
                    label="Date"
                    value={submitDate.length>8?submitDate:''}
                    />
                </Grid>     
                <Grid item sm={3}>
                    <Controls.InputDisabled
                    name="startHourDisabled"
                    label="Start Hour"
                    value={postBody.startHour}/>
                </Grid>
                <Grid item sm={3}>
                    <Controls.InputDisabled
                    name="endHourDisabled"
                    label="End Hour"
                    value={postBody.endHour}/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item sm={6}>
                    <Controls.InputDisabled
                    name="gameDisabled"
                    label="Game"
                    value={values.game.name}
                    />
                </Grid>
                <Grid item sm={6}>
                    <Grid container alignItems="center" justify="center">
                        <Controls.InputDisabled
                        name="tableDisabled"
                        label="Table"
                        value={values.table.code}
                        />
                    </Grid>
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
        </div>
    );
}
