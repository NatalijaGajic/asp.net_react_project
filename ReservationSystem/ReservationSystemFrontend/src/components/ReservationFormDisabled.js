import React from 'react'
import Controls from '../components/controls/Controls'
import {Grid} from '@material-ui/core'
import {UseForm, Form} from '../components/UseForm'

export default function ReservationFormDisabled(props) {
    const {values, handleSubmit, submitText, showSubmit} = props;
    return (
        <Form onSubmit={handleSubmit}>
        <Grid container>
            <Grid item sm={6}>
                <Controls.InputDisabled
                    name="firstAndLastNameDisabled"
                    value={values.firstAndLastName}
                    label="First and Last Name"/>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item sm={6}>
                <Controls.InputDisabled
                name="dateDisabled"
                label="Date"
                value={values.workDayId}
                />
            </Grid>     
            <Grid item sm={3}>
                <Controls.InputDisabled
                name="startHourDisabled"
                label="Start Hour"
                value={values.startHour}/>
            </Grid>
            <Grid item sm={3}>
                <Controls.InputDisabled
                name="endHourDisabled"
                label="End Hour"
                value={values.endHour}/>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item sm={6}>
                <Controls.InputDisabled
                name="gameDisabled"
                label="Game"
                value={values.game}
                />
            </Grid>
            <Grid item sm={6}>
                <Grid container alignItems="center" justify="center">
                    <Controls.InputDisabled
                    name="tableDisabled"
                    label="Table"
                    value={values.table}
                    />
                </Grid>
            </Grid>
        </Grid>
        { showSubmit && <Grid container>
            <Grid item sm={6}></Grid>
            <Grid item sm={6} >
                <Grid container alignItems="center" justify="center">
                    <Controls.Button
                    variant="contained"
                    color="primary"
                    size="large"
                    text={submitText}
                    type="submit"/>

                </Grid>
            </Grid>
        </Grid>}
        </Form>
    )
}
