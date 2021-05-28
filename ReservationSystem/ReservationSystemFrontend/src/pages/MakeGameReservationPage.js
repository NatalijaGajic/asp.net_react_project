import React from 'react';
import GameReservationForm from '../components/GameReservationForm';
import PageHeader from '../components/PageHeader';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

export default function MakeGameReservation(props) {
    let gameId = props.match.params['id']
    console.log(gameId);

    return (
        <div>
            <PageHeader
            title="New reservation"
            subtitle="Make a table reservation"
            icon={<AddCircleOutlineOutlinedIcon fontSize="large"/>}
            />
            <GameReservationForm gameId={gameId}></GameReservationForm>
        </div>
    )
}
