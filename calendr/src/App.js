import React from 'react';
import './App.css';
import NavBar from './components/general/NavBar'
import MarketingPage from './components/general/MarketingPage'
import Users from './components/general/Users'
import { Route } from 'react-router-dom';
// import Month from './components/calendar/Month'
// import Day from './components/calendar/Day'

function App() {
  return (
    <div className="App">
     <NavBar/>
     <Route exact path="/" component={MarketingPage} />
     <Route path="/users" component={Users} />
     
     {/* <Month/>
     <Day/> */}
    </div>
  );
}

export default App;
