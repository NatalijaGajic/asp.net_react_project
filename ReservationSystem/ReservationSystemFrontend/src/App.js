import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Contact from './pages/ContactPage';
import SignUp from './pages/SignUpPage';
import Layout from './components/Layout';
import MakeReservation from './pages/MakeReservationPage';

function App() {
  return (
     <Layout>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' component={About} />
        <Route path='/contact-us' component={Contact} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/make-reservation' component={MakeReservation} />


      </Switch>
    </Layout>
  );
}

export default App;