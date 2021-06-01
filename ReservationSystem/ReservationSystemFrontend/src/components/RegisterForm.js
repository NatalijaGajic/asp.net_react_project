import React, {useState} from 'react'
import {Grid, makeStyles, Link} from "@material-ui/core"
import {UseForm, Form} from './UseForm'
import Controls from '../components/controls/Controls'
import {useAuth} from '../contexts/AuthContext'
import Notification from '../components/Notification'
import { useHistory } from "react-router-dom";


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
    confirmPassword:''
}

export default function RegisterForm() {
    const {signup, signupError, setSignupError} = useAuth();
    const {values, setValues, handleInputChange, errors, setErrors} = UseForm(initialFieldValues);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
    const history = useHistory();

    const validate = () => {
        setSignupError('')
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

    const onSuccess = () => {
        setNotify({isOpen:true, 'message':'Succesfully created', type:'success'});
        setValues(initialFieldValues)
        setErrors({})
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true);
        if(validate()){
            let body = {
                username: values.username,
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                telephone: values.telephone
            }
            signup(values, onSuccess)
        }
        setLoading(false);
    }

    const navigateToLogin = () => {
        history.push('/log-in')
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
                {signupError && <p className={classes.errorParagraph}>{signupError}</p>}
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
                        disabled={loading}
                        variant="contained"
                        color="primary"
                        size="large"
                        text="sign up"
                        type="submit"/>
                </Grid>
            </Grid>
            <Grid item xs={12} container justify="center" alignItems="flex-end"
                style={{paddingTop: '1em'}}>
                <Link href="#" onClick={navigateToLogin} style={{textDecoration: 'underline'}}>
                    Log in with email
                </Link>
            </Grid>
        </Form>
        <Notification
        notify={notify}
        setNotify={setNotify}
        />
        </>
    )
}
