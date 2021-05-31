import { Grid } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import Game from '../components/Game';
import Pagination from './Pagination';
import { useHistory } from "react-router-dom";
import InformationDialog from './InformationDialog';
import {useAuth} from '../contexts/AuthContext';

//const user = {penalty: 2};

export default function GameList(props) {
  const {currentUser} = useAuth();
  const history = useHistory();
  const [user, setUser] = useState();
  const [ informationDialog, setInformationDialog] = useState({isOpen:false, title:'', subtitle:''})

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const directToMakeReservation = (game) => {
    if(user == null){
      history.push('/log-in/');
      
    }
    else if(user.penalty === 3){
      setInformationDialog({
          isOpen:true,
          title:'You have 3 penalties, you can not make reservation',
          subtitle:'Penalties are deleted after one month.'
      });
    }
    else{
        history.push('/make-game-reservation/'+game.id);
    }
  }

  const handleCardClick = (game) => {
    history.push('/games/'+game.id);
  }

return(
    <>
    <Grid container spacing={2}>
      {props.games.map((game) => {
        return <Grid item sm={4} flexshrink={0}>
                    <Game
                  key = {game.id}
                  id = {game.id}
                  name = {game.name}
                  description = {game.description}
                  price = {game.price}
                  valute = {game.valute}
                  numberOfPlayers = {game.numberOfPlayers}
                  onMakeReservationClick = {() => directToMakeReservation(game)}
                  handleCardClick={() => handleCardClick(game)}
                  />
                </Grid> 
      })}
    </Grid>
    <InformationDialog
            informationDialog={informationDialog}
            setInformationDialog={setInformationDialog}>
    </InformationDialog>
    
    </>
);
    
}
