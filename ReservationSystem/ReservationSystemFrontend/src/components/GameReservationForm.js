import React, {useState, useEffect} from 'react'
import {Grid} from '@material-ui/core'
import Controls from '../components/controls/Controls'
import { workDayByDate, createAPIEndpoint, ENDPOINTS} from '../api'
import PaperForm from '../components/PaperForm';
import GamesAndTablesForm from '../components/GamesAndTablesForm'
import Notification from '../components/Notification'
import {UseForm, Form} from '../components/UseForm'
import {range, getStringDate} from '../utils/utils';


const initialFieldValues = {
    firstAndLastName:'',
    startHour:0,
    endHour:0,
    date: new Date(),
    startHours:[],
    endHours:[],
    game: {name:''},
    table: {code:''},
    workDayId:'',
    gameId: ''
}

export default function GameReservationForm(props) {
    const {gameId} = props; 
    const [queryParams, setQueryParams] = useState({workDayId:'', startHour:0, endHour:0, gameId:''});
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
    const [date, setDate] = useState(new Date()); //because of useEffect, so it doesnt loop
    const [submitDate, setSubmitDate] = useState(new Date()); 
    const [displayReservationGamesList, setDisplayReservationGamesList] = useState(false);
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
    const {values, setValues, handleInputChange,  errors, setErrors} = UseForm({
        ...initialFieldValues,
        gameId:{gameId}
    }, true, validate);  

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

    const handleSearch = e => {

    }

    const handleSubmit = e => {

    }
    
    const handleInputChangeDatePicker = e => {
        console.log('handleInputChangeDatePicker');
        handleInputChange(e);
        let date = getStringDate(values.date);
        console.log(date);
        setDate(date);
    }
    
    return (
        <div>
        <Grid container>
        <Grid container direction="column" item sm={6}>
        <PaperForm>
       <Form onSubmit={handleSearch}>
            <Grid container direction="column">
                <Grid item sm={12}>
                    <Controls.InputDisabled
                    name="gameDisabled"
                    label="Game"
                    value={values.game.name}
                    style={{width: "100%", marginTop: "0.5em"}}
                    />
                </Grid>
                <Grid item sm={12}>
                    <Controls.Input
                        name="firstAndLastName"
                        value={values.firstAndLastName}
                        label="First and Last Name"
                        onChange={handleInputChange}
                        error={errors.firstAndLastName}
                        style={{width: "100%", marginTop: "0.5em"}}/>
                </Grid>
                <Grid item sm={12}>
                    <Controls.DatePicker
                    name="date"
                    label="Date"
                    value={values.date}
                    onChange={handleInputChangeDatePicker}
                    error={errors.date}
                    style={{width: "100%", marginTop: "0.5em"}}
                    />
                </Grid>  
                <Grid item sm={12} container justify="space-between" spacing={2}>
                    <Grid item sm={6}>
                        <Controls.Select
                        name="startHour"
                        label="Start Hour"
                        value={values.startHour}
                        onChange={handleInputChange}
                        options={values.startHours}
                        error={errors.startHour}
                        style={{width: "100%", marginTop: "0.5em"}}/>
                    </Grid>
                    <Grid item sm={6} item justify="flex-end">
                        <Controls.Select
                        name="endHour"
                        label="End Hour"
                        value={values.endHour}
                        onChange={handleInputChange}
                        options={values.endHours}
                        error={errors.endHour}
                        style={{width: "100%", marginTop: "0.5em"}}/>
                    </Grid>
                </Grid>
                <Grid item={12} container justify="flex-end">
                            <Controls.Button
                            style={{marginRight: "5em", marginTop: "2em", width: "100%"}}
                            variant="contained"
                            color="primary"
                            size="large"
                            text="search"
                            type="submit"/>
                </Grid>
            </Grid>
        </Form>
        </PaperForm>
        </Grid>
        <Grid direction="column" item sm={6}>
            <GamesAndTablesForm
            {... {queryParams, setQueryParams, chooseGame, chooseTable, displayReservationGamesList}}/>
        </Grid>
        </Grid>
       
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
                <Grid item sm={6} container justify="center">
                    <Grid item sm={6} container justify="flex-end">
                        <Controls.InputDisabled
                        name="startHourDisabled"
                        label="Start Hour"
                        value={postBody.startHour}/>
                    </Grid>
                    <Grid item sm={6} container justify="flex-start">
                        <Controls.InputDisabled
                        name="endHourDisabled"
                        label="End Hour"
                        value={postBody.endHour}/>
                    </Grid>
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
            <Grid container alignItems="center" justify="flex-end">
                <Grid item sm={3} container justify="flex-end"
                style={{marginRight: "2em"}}
                >
                        <Controls.Button
                        style={{marginRight: "5em", marginTop: "2em", width: "100%"}}
                        variant="contained"
                        color="primary"
                        size="large"
                        text="search"
                        type="submit"/>
                </Grid>
            </Grid>
            </Form>
        </PaperForm>
        <Notification
        notify={notify}
        setNotify={setNotify}
        />
        </div>
    )
}
