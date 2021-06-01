import React, {useState} from 'react'
import {Grid, makeStyles} from "@material-ui/core"
import {UseForm, Form} from './UseForm'
import Controls from '../components/controls/Controls'
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {useAuth} from '../contexts/AuthContext';


const initialFieldValues = {
    email: '',
    password: ''
}

const useStyles = makeStyles((theme) => ({
    errorParagraph: {
        color: "#DC143C"
    }
}))

export default function LoginForm() {
    const {values, setValues, handleInputChange, errors, setErrors} = UseForm(initialFieldValues);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const history = useHistory();
    const {login} = useAuth();
    const {loginError} = useAuth();

    const validate = () => {
        return true;
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
            login(values.email, values.password);
        }
    }

    const navigateToSignUp = (event) => {
        event.preventDefault();
        history.push('/sign-up');
    }

    return (
        <Grid container justify="center">
            <Form onSubmit={handleSubmit}>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        style={{width: "100%", marginTop: "0.5em"}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controls.Input
                        style={{width: "100%", marginTop: "0.5em"}}
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        type="password"
                        />
                    </Grid>
                    <Grid item xs={12} container justify="center">
                    {loginError!=='' && <p className={classes.errorParagraph}>{loginError}</p>}
                    </Grid>
                    <Grid item xs={12}>
                        <Controls.Button
                        style={{marginTop: "0.5em"}}
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        size="large"
                        text="Log in"
                        type="submit"
                        disabled={loading}/>
                    </Grid>
                </Grid>
                <Grid item xs={12} container justify="center" alignItems="flex-end"
                style={{paddingTop: '1em'}}>
                <Link href="#" onClick={navigateToSignUp} style={{textDecoration: 'underline'}}>
                    Sign up if you don't have an account
                </Link>
                </Grid>
                
            </Form>
        </Grid>

    )
}
