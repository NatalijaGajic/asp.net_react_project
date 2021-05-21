import React, {useState, useEffect} from 'react'
import { Grid} from '@material-ui/core';
import ReservationTablesList from '../components/ReservationTablesList'
import ReservationGamesList from '../components/ReservationGamesList'
import {Form} from '../components/UseForm'
import PaperForm from '../components/PaperForm';
import {intervalsForWorkDay} from '../api/index'

export default function GamesAndTablesForm(props) {
    const {queryParams, setQueryParams, chooseGame, chooseTable} = props;
    const [gamesArray, setGamesArray] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [tablesArray, setTablesArray] = useState([]);

    useEffect(() => {
        intervalsForWorkDay(queryParams.workDayId, queryParams.startHour, queryParams.endHour)
        .fetch()
        .then(res => {
            console.log(res.data);
            setGamesArray(res.data.games);
            setSearchList(res.data.games);
            setTablesArray(res.data.tables);
        })
        .catch(err => {
            console.log(err);
        });
    }, [queryParams]);

    return (
        <PaperForm>
        <Form>
            <Grid container>
                <Grid item sm={6}>
                    <ReservationGamesList 
                    {...{searchList, setSearchList, gamesArray, setGamesArray, chooseGame}}/>
                </Grid>
                <Grid item sm={6}>
                    <ReservationTablesList
                     {...{tablesArray, setTablesArray, chooseTable}}/>
                </Grid>
            </Grid>
        </Form>
        </PaperForm>
    )
}
