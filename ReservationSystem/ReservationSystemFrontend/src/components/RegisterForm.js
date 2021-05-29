import React, {useState} from 'react'
import {Grid, makeStyles} from "@material-ui/core"
import {UseForm, Form} from './UseForm'
import Controls from '../components/controls/Controls'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
    errorParagraph: {
        color: "#DC143C"
    }
}))



const initialFieldValues = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    telephone: '',
}

export default function RegisterForm() {
    const {values, setValues, handleInputChange, errors, setErrors} = UseForm(initialFieldValues);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const validate = () => {
        console.log(values.email);
        let temp = {}
        temp.firstName = values.firstName?"":"This field is required"
        temp.lastName = values.lastName?"":"This field is required"
        temp.email = ((/$^|.+@.+..+/).test(values.email) && values.email.length!=0)?"":"Email is not valid"
        temp.username = values.username.length>3?"":"Minimum 4 characters required"
        temp.password = values.password.length !== 0?"":"This field is required"
        if(temp.password === "" && values.password !== values.confirmPassword){
            setError("Passwords do not match");
            return false;
        } else {
            setError('');
        }
        temp.telephone = values.telephone.length>8?"":"Minimum 9 characters required"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x=> x === "");
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
            window.alert('Testing');
        }
    }

    return (
        <>
       <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid xs={6}>
                    <Controls.Input
                    name="firstName"
                    value={values.firstName}
                    label="First Name"
                    onChange={handleInputChange}
                    error={errors.firstName}
                    style={{width: "97%"}}/>
                </Grid>
                <Grid xs={6}>
                    <Controls.Input
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                    style={{width: "97%"}}
                    />
                </Grid>
                <Grid xs={6}>
                    <Controls.Input
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    style={{width: "97%"}}
                    />
                </Grid>
                <Grid xs={6}>
                    <Controls.Input
                    label="Username"
                    name="username"
                    value={values.username}
                    onChange={handleInputChange}
                    error={errors.username}
                    style={{width: "97%"}}
                    />
                </Grid>
                <Grid xs={6}>
                    <Controls.Input
                    label="Password"
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    type="password"
                    style={{width: "97%"}}
                    />
                </Grid>
                <Grid xs={6}>
                    <Controls.Input
                    label="Confirm password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleInputChange}
                    error={errors.confirmPassword}
                    type="password"
                    style={{width: "97%"}}
                    />
                </Grid>
                <Grid item xs={6}>
                <Controls.Input
                    label="Telephone"
                    name="telephone"
                    value={values.telephone}
                    onChange={handleInputChange}
                    error={errors.telephone}
                    style={{width: "97%"}}
                    />
                </Grid>
            </Grid>
            <Grid container justify="center">
                {error && <p className={classes.errorParagraph}>{error}</p>}
            </Grid>
            {/*<Grid container>
                <Grid item sm={9}></Grid>
                <Grid container sm={3} alignItems="center" justify="center">
                    <Controls.Button
                    variant="contained"
                    color="primary"
                    size="large"
                    text="submit"
                    type="submit"
                    disabled={loading}/>
                </Grid>
            </Grid>*/}
              <Grid container alignItems="center" justify="flex-end">
                <Grid item sm={3} container justify="flex-end"
                style={{marginRight: "0.5em"}}
                >
                        <Controls.Button
                        style={{marginRight: "6em", marginTop: "2em", width: "100%"}}
                        variant="contained"
                        color="primary"
                        size="large"
                        text="sign up"
                        type="submit"/>
                </Grid>
            </Grid>
        </Form>
        </>
    )
}
