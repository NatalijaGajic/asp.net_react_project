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
    userName: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    telephone: '',
}

export default function RegisterForm() {
    const {values, setValues, handleInputChange} = UseForm(initialFieldValues);
    
    return (
       <Form>
            <Grid container>
                <Grid xs={3}>
                    <Controls.Input
                    name="firstName"
                    value={values.firstName}
                    label="Last Name"
                    onChange={handleInputChange}/>
                </Grid>
                <Grid xs={3}>
                    <Controls.Input
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleInputChange}
                    />
                </Grid>
                <Grid xs={3}>
                    <Controls.Input
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    />
                </Grid>
                <Grid xs={3}>
                    <Controls.Input
                    label="Password"
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
            <Grid container>
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
                    />
                </Grid>
            </Grid>
        </Form>
    )
}
