import React from 'react';
import Game from '../components/Game';

export default function GameList(props) {
return(
    <div>
      {props.games.map((game) => {
        return <Game
        key = {game.id}
        id = {game.id}
        name = {game.name}
        description = {game.description}
        price = {game.price}
        valute = {game.valute}
        numberOfPlayers = {game.numberOfPlayers}
        /> 
      })}
    </div>
);
    
}
