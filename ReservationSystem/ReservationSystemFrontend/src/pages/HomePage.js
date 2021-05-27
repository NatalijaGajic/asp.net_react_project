import GameList from '../components/GameList';
import React, {useState, useEffect} from 'react';
import Loader from '../components/Loader';
import {createAPIEndpoint, ENDPOINTS} from '../api/index'
import { FormatListNumberedOutlined } from '@material-ui/icons';
import {Grid} from '@material-ui/core'
import Pagination from '../components/Pagination'
 
/*const DUMMY_DATA = [
  {
    id: 2,
    name: 'Game 1',
    description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    price: 1,
    valute: '$',
    numberOfPlayers: 5
  },
  {
    id: 1,
    name: 'Game 2',
    description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    price: 1,
    valute: '$',
    numberOfPlayers: 4
  }
];*/

const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [loadedGames, setGames] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect (() => {
      createAPIEndpoint(ENDPOINTS.GAMES)
    .fetchAll()
    .then((response) => {
      console.log(response.data);
      setLoading(false);
      setGames(response.data.data);
      setNumberOfPages(response.data.numberOfPages);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  if(isLoading){
    return (
      <Loader></Loader>
    );
  }

  return (
    <div>
    <GameList games={loadedGames}></GameList>
    <Grid container justify="flex-end" spacing={3}>
      <Grid item>
         <Pagination numOfPages={numberOfPages} setGames={setGames}></Pagination>
      </Grid>
    </Grid>
    </div>
  );
};

export default Home;