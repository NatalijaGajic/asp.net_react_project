import { Grid } from '@material-ui/core';
import React from 'react';
import Game from '../components/Game';

const images = { "6072281d5be9df9eb32c6515":"src\images\gloomhaven.jpg",
"":"","":"","":"","":""}

export default function GameList(props) {
return(
    <Grid container spacing={2}>
      {props.games.map((game) => {
        return <Grid item sm={4} flexShrink={0}>
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
