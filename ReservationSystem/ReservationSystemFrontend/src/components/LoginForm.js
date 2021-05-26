import React, {useState} from 'react'
import {Grid, makeStyles} from "@material-ui/core"
import {UseForm, Form} from './UseForm'
import Controls from '../components/controls/Controls'

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

    const validate = () => {
        return true;
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
            window.alert('Testing');
        }
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
                    <Grid item xs={12}>
                    {error && <p className={classes.errorParagraph}>{error}</p>}
                    </Grid>
                    <Grid item xs={12}>
                        <Controls.Button
                        style={{marginTop: "0.5em"}}
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        size="large"
                        text="submit"
                        type="submit"
                        disabled={loading}/>
                    </Grid>
                </Grid>
            </Form>
        </Grid>

    )
}
