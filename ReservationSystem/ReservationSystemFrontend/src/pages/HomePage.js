import GameList from '../components/GameList';
import React, {useState, useEffect} from 'react';
import Loader from '../components/Loader';

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
  const [loadedGmes, setGames] = useState([]);

  useEffect (() => {
      fetch('http://localhost:5000/Games'
    )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      setLoading(false);
      setGames(data);
    });
  }, []);

  if(isLoading){
    return (
      <Loader></Loader>
    );
  }

  return (
    <GameList games={loadedGmes}></GameList>
  );
};

export default Home;