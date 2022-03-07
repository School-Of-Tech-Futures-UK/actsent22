import * as React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ListOfVenues from'./components/listofvenues/ListOfVenues'
import SingleVenuePage from './pages/SingleVenuePage';
import EventsPage from './pages/EventsPage';
import SearchEventsForm from './pages/EventsPage';
import SplashPage from './pages/SplashPage';

import { useEffect, useState} from 'react'
import {
  BrowserRouter ,
  Switch,
  Route,
  NavLink,
  useParams,
  useLocation,
  useHistory,
  Link
} from "react-router-dom";

const Routes = () => (

  <Switch>

    <Route exact path= '/venues'>
      <ListOfVenues />
    </Route>

    <Route exact path={`/venues/location:location`}>
      <ListOfVenues />
    </Route>

    <Route exact path={`/venues/:id`}>
      <SingleVenuePage />
    </Route>

    <Route exact path={`/events`}>
      <SearchEventsForm />
    </Route>

    <Route path="/">
      <SplashPage />
    </Route>
  </Switch>

);


const NavBar = () => {
  // For illustration
  const { pathname } = useLocation();

  return (
    // <label>{pathname}</label>
    <>
      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/"><b> ActSent </b>| Part of GigStr</a>
          <NavLink class="navbar-brand" to="/venues"> Venues </NavLink>
          <NavLink class="navbar-brand" to="/events"> Events </NavLink>
        </div>
      </nav>
    </>
  );

  // return (
  //   <>
  //     <label>{pathname}</label>
  //     <nav>
  //       <NavLink to="/"> Home </NavLink>
  //       <NavLink to="/venues"> View Venue </NavLink>
  //       <NavLink to="/events"> View Events </NavLink>
  //       <NavLink to="/mybooking"> Booking </NavLink>
  //     </nav>
  //   </>
  // );
};


const RequestButton = (props) => {
  return <button onClick={props.onClick}> Press me {props.message}</button>
} 

/*const WelcomeMessage = (message) => {
  //var message = "";
  return <div>{message}</div>
}*/

function App()  {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes />
      </BrowserRouter>
    </>
  )
  
}





export default App;

