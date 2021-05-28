import React from 'react'
import GameDetailsForm from '../components/GameDetailsForm';

export default function GameDetails(props) {
    let gameId = props.match.params['id'];
    console.log(gameId);
    return (
        <div>
            <GameDetailsForm gameId={gameId}/>
        </div>
    )
}
