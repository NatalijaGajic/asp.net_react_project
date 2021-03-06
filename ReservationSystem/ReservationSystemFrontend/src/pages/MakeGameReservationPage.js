import React, { useEffect, useState } from 'react';
import GameReservationForm from '../components/GameReservationForm';
import PageHeader from '../components/PageHeader';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {createAPIEndpoint, ENDPOINTS} from '../api/index';

export default function MakeGameReservation(props) {
    const [gameID, setGameID] = useState({});
    //const [game, setGame] = useState({name: ''}); //TODO: set on null
    const [game, setGame] = useState(null);

    //TODO: fetching used to be in GameReservationForm; when navigated from game details not working
    useEffect(() => {
        let id = props.match.params['id'];
        console.log(id);
        createAPIEndpoint(ENDPOINTS.GAMES).fetchById(id)
        .then((response) => {
            console.log(response.data);
            setGame(response.data);
        })
        .catch((err) =>{
            console.log(err);
        });
        setGameID(id);
    }, []);

    return (
        <div>
            <PageHeader
            title="New reservation"
            subtitle="Make a table reservation"
            icon={<AddCircleOutlineOutlinedIcon fontSize="large"/>}
            />
           {game && <GameReservationForm gameID={gameID} game={game}></GameReservationForm>}
        </div>
    )
}
