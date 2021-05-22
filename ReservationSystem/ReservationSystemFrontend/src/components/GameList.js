import { Grid } from '@material-ui/core';
import React from 'react';
import Game from '../components/Game';

export default function GameList(props) {
return(
    <Grid container>
      {props.games.map((game) => {
        return <Grid item sm={3}>
                    <Game
                  key = {game.id}
                  id = {game.id}
                  name = {game.name}
                  description = {game.description}
                  price = {game.price}
                  valute = {game.valute}
                  numberOfPlayers = {game.numberOfPlayers}
                  />
                </Grid> 
      })}
    </Grid>
);
    
}
