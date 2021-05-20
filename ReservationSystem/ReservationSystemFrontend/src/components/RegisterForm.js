import React, {useState, useEffect} from 'react'
import {Grid} from "@material-ui/core"
import {UseForm, Form} from './UseForm'
import Controls from '../components/controls/Controls'

const items = [
    {id:'male', title:'Male'},
    {id:'other', title:'Other'},
    {id:'female', title:'Female'},
]



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
    
    const validate = () => {
        let temp = {}
        temp.firstName = values.firstName?"":"This field is required"
        temp.lastName = values.lastName?"":"This field is required"
        temp.email = (/$^|.+@.+..+/).test(values.email)?"":"Email is not valid"
        temp.username = values.username.length>3?"":"Minimum 4 characters required"
        temp.password = values.password.length != 0?"":"This field is required"
        temp.telephone = values.telephone.length>8?"":"Minimum 9 characters required"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x=> x == "");
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        if(!validate())
            window.alert('Testing');
    }

    return (
       <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid xs={3}>
                    <Controls.Input
                    name="firstName"
                    value={values.firstName}
                    label="Last Name"
                    onChange={handleInputChange}
                    error={errors.firstName}/>
                </Grid>
                <Grid xs={3}>
                    <Controls.Input
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                    />
                </Grid>
                <Grid xs={3}>
                    <Controls.Input
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    />
                </Grid>
                <Grid xs={3}>
                    <Controls.Input
                    label="Password"
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid xs={3}>
                    <Controls.Input
                    label="Username"
                    name="username"
                    value={values.username}
                    onChange={handleInputChange}
                    error={errors.username}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                    label="Gender"
                    value={values.gender}
                    onChange={handleInputChange}
                    name="gender"
                    items={items}/>
                </Grid>
                <Grid item xs={6}>
                <Controls.Input
                    label="Telephone"
                    name="telephone"
                    value={values.telephone}
                    onChange={handleInputChange}
                    error={errors.telephone}
                    />
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
    )
}
