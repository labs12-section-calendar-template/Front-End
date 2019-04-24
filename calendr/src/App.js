import React from 'react';
import './App.css';
import NavBar from './components/general/NavBar'
import MarketingPage from './components/general/MarketingPage'
// import Month from './components/calendar/Month'
// import Day from './components/calendar/Day'

function App() {
  return (
    <div className="App">
     <NavBar/>
     <MarketingPage/>
     {/* <Month/>
     <Day/> */}
    </div>
  );
}

export default App;
