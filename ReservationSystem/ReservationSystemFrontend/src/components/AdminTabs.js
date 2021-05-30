import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {createAPIEndpoint, ENDPOINTS} from '../api/index';
import ReservationsTable from '../components/ReservationsTable'
import {CircularProgress} from '@material-ui/core'
import GamesTable from '../components/GamesTable';
import TablesTable from '../components/TablesTable';

export default function DisabledTabs() {
  const [value, setValue] = React.useState(1);
  const [reservations, setReservations] = useState([]);
  const [games, setGames] = useState([]);
  const [tables, setTables] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(value === 0){
        //TODO: Fetch all returns paged reponse
        createAPIEndpoint(ENDPOINTS.GAMES).fetchAll()
        .then((response) => {
            console.log(response.data.data);
            setGames(response.data.data);
        })
        .catch((err) => {
            console.log(err);
        })
        setLoading(false);
    }
    if(value === 1){
        createAPIEndpoint(ENDPOINTS.RESERVATIONS).fetchAll()
        .then((response) => {
            let res = response.data.map((reservation) => ({
                ...reservation,
                gameName:reservation.game.name,
                tableCode:reservation.table.code,
                people:reservation.table.numberOfPeople
            }
            ))
            setReservations(res);
            console.log(res);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    if(value === 2){
        createAPIEndpoint(ENDPOINTS.TABLES).fetchAll()
        .then((response) => {
            console.log(response.data);
            setTables(response.data);
        })
        setLoading(false);

    }
  }, [value]);

  const handleChange = (event, newValue) => {
    //console.log(newValue); 0, 1, 2
    setValue(newValue);
  };

 
  return (
    <>
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Games" />
        <Tab label="Reservations" />
        <Tab label="Tables" />
      </Tabs>
    </Paper>
    {
        (value === 0) && ( isLoading?  <CircularProgress />:
            <div style={{marginTop:'2em'}}><GamesTable records={games}/></div>)
    }
    {
        (value === 1) &&  ( isLoading?  <CircularProgress />:
        <div style={{marginTop:'2em'}}><ReservationsTable records={reservations} displayDelete={true}/></div>)
    }
    {
        (value === 2) && ( isLoading?  <CircularProgress />:
            <div style={{marginTop:'2em'}}><TablesTable records={tables}/></div>)
    }
    </>
    );
}
