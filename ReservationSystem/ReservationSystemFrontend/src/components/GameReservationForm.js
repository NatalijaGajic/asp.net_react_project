import React from 'react'
import {UseForm, Form} from '../components/UseForm'
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
    
    return (
        <div>
            <p>Game Reservation form {gameId}</p>
        </div>
    )
}
