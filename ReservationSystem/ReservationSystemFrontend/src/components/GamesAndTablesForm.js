import React, {useState, useEffect} from 'react'
import { Grid} from '@material-ui/core';
import ReservationTablesList from '../components/ReservationTablesList'
import ReservationGamesList from '../components/ReservationGamesList'
import {Form} from '../components/UseForm'
import PaperForm from '../components/PaperForm';
import {intervalsForWorkDay} from '../api/index'

export default function GamesAndTablesForm(props) {
    const {queryParams, setQueryParams, chooseGame, chooseTable, displayReservationGamesList} = props;
    const [gamesArray, setGamesArray] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [tablesArray, setTablesArray] = useState([]);

    useEffect(() => {
        intervalsForWorkDay(queryParams)
        .fetch()
        .then(res => {
            console.log(res.data);
            //null when game is not available
            res.data.games != null ? setGamesArray(res.data.games): setGamesArray([]);
            res.data.games != null? setSearchList(res.data.games): setSearchList([]);
            res.data.tables != null? setTablesArray(res.data.tables): setTablesArray([]);
        })
        .catch(err => {
            console.log(err);
        });
    }, [queryParams]);

    return (
        <>
        <div></div>
        {   displayReservationGamesList &&
           (
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
            </Form>)
           
        }
        {!displayReservationGamesList && 
           (
           <Form>
                   <ReservationTablesList
                   {...{tablesArray, setTablesArray, chooseTable}}/>
           </Form>)       
        }
        </>
       
    )
}
