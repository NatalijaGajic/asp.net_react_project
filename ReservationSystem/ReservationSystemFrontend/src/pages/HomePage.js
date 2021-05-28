import GameList from '../components/GameList';
import React, {useState, useEffect} from 'react';
import Loader from '../components/Loader';
import {createAPIEndpoint, ENDPOINTS, getGamesFiltered} from '../api/index'
import {Grid} from '@material-ui/core'
import Pagination from '../components/Pagination'
import GameFilters from '../components/GameFilters';
 
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

const initialQueryParams = {
  SearchByName: '',
  NumberOfPeople: 2,
  IsActive: true,
  OrderBy: 'Name',
  PageNumber : 1,
  PageSize : 6
}

const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [loadedGames, setGames] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [orderBy, setOrderBy] = useState('Name Asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState(initialQueryParams);
  const [changeNumberOfPages, setChangeNumberOfPages] = useState(true);

  /*useEffect (() => {
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
  }, []);*/

  useEffect (() => {
    setLoading(true);
    /*let queryParams = {
      SearchByName: '',
      NumberOfPeople: numberOfPeople,
      IsActive: true,
      OrderBy: orderBy.split(' ')[0]
    }*/
    getGamesFiltered(queryParams).fetch()
    .then((response) => {
      console.log('getGamesFiltered');
      console.log(response.data);
      setLoading(false);
      setGames(response.data.data);
      //this triggers useEffect in pagination so it sets the curr page to 1
      //when queryParams are set in setPage changeNumberOfPages is set to false
      if(changeNumberOfPages){
        console.log('Changing number of pages');
        setNumberOfPages(response.data.numberOfPages);
      }
      setChangeNumberOfPages(true);
    })
    .catch(err => {
      console.log(err);
    })
  }, [queryParams]);

  /*const fetchGamesForNewPage = (queryParams) => {
    getGamesForPageQuery(queryParams).fetch()
    .then((response) => {
        console.log('fetchGamesForNewPage');
        console.log(response.data);
        setGames(response.data.data);
    })
    .catch(err => {
        console.log(err);
    })
}*/

const setPage = (page) => {
    setChangeNumberOfPages(false);
    if (page === '...'){
        if(currentPage + 2 < numberOfPages){
            setQueryParams({
                ...queryParams,
                PageNumber : currentPage + 2,
                PageSize : 6
            });
            //fetchGamesForNewPage(queryParams);
            setCurrentPage((prev) => prev + 2);

        }else {
            setQueryParams({
              ...queryParams, 
              PageNumber : numberOfPages,
              PageSize : 6,
            });
            //fetchGamesForNewPage(queryParams);
            setCurrentPage(numberOfPages);
        }
        return;
    }
    if(page === 'next'){
        if(currentPage < numberOfPages){
            setQueryParams({
              ...queryParams, 
              PageNumber : currentPage + 1,
              PageSize : 6
            });
            //fetchGamesForNewPage(queryParams);
            setCurrentPage((prev) => prev + 1);
        }
        return;
    }
    if(page === 'prev'){
        if(currentPage  > 1){
            setQueryParams({
              ...queryParams, 
              PageNumber : currentPage - 1,
              PageSize : 6
            });
            //fetchGamesForNewPage(queryParams);
            setCurrentPage((prev) => prev - 1);
        }
        return;
    }
    setQueryParams({
      ...queryParams, 
      PageNumber : page,
      PageSize : 6
    });
    //fetchGamesForNewPage(queryParams);
    setCurrentPage(page);
}

  if(isLoading){
    return (
      <Loader></Loader>
    );
  }

  return (
    <div>
      <div style={{marginBottom:'8px'}}>
     <GameFilters
      orderBy={orderBy}
      numberOfPeople={numberOfPeople}
      setNumberOfPeople={setNumberOfPeople}
      setOrderBy={setOrderBy}
      queryParams={queryParams}
      setQueryParams={setQueryParams}
      numberOfPages={numberOfPages}
      changeNumberOfPages={changeNumberOfPages}
      setChangeNumberOfPages={setChangeNumberOfPages}/>
     </div>
    <GameList games={loadedGames}></GameList>
    <Grid container justify="flex-end" spacing={3}>
      <Grid item>
         <Pagination 
          numberOfPages={numberOfPages}
          setPage={setPage}
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
        >
         </Pagination>
      </Grid>
    </Grid>
    </div>
  );
};

export default Home;