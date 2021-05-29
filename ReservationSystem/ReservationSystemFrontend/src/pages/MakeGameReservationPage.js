import React, { useEffect, useState } from 'react';
import GameReservationForm from '../components/GameReservationForm';
import PageHeader from '../components/PageHeader';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

export default function MakeGameReservation(props) {
    const [gameID, setGameID] = useState({});

    useEffect(() => {
        let id = props.match.params['id'];
        console.log(id);
        setGameID(id);
    }, []);

    return (
        <div>
            <PageHeader
            title="New reservation"
            subtitle="Make a table reservation"
            icon={<AddCircleOutlineOutlinedIcon fontSize="large"/>}
            />
            <GameReservationForm gameID={gameID}></GameReservationForm>
        </div>
    )
}
