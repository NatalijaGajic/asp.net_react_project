import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Contact from './pages/ContactPage';
import SignUp from './pages/SignUpPage';
import Layout from './components/Layout';
import MakeReservation from './pages/MakeReservationPage';
import Reservations from './pages/ReservationsPage';
import {AuthProvider} from './contexts/AuthContext'
import Login from './pages/LoginPage';
import GameDetails from './pages/GameDetailsPage';
import MakeGameReservation from './pages/MakeGameReservationPage';
import AdminHome from './pages/AdminHomePage';
import MakeGame from './pages/MakeGamePage';
import MakeTable from './pages/MakeTablePage';

//TODO: better handling when making reservation, on fe and be shouldnt make reservation for 
//older days

//TODO: Custom route component, protected paths
function App() {
  return (
    <AuthProvider>
     <Layout>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/contact-us' component={Contact} />
        <Route path='/log-in' component={Login} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/make-reservation' component={MakeReservation} />
        <Route path='/reservations' component={Reservations}/>
        <Route path='/games/:id' component={GameDetails}/>
        <Route path='/make-game-reservation/:id' component={MakeGameReservation}/>
        <Route path='/home-page' component={AdminHome}/>
        <Route path='/make-game' component={MakeGame}></Route>
        <Route path='/update-game/:id' component={MakeGame}></Route>
        <Route path='/update-table/:id' component={MakeTable}></Route>
        <Route path='/make-table' component={MakeTable}></Route>
      </Switch>
    </Layout>
    </AuthProvider>
  );
}

export default App;
