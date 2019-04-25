import React from "react";
import "./App.css";
import NavBar from "./components/general/NavBar";
import MarketingPage from "./components/general/MarketingPage";
// import Month from './components/calendar/Month'
// import Day from './components/calendar/Day'
import Week from "./components/calendar/Week";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <MarketingPage/> */}
      {/* <Month/>
     <Day/> */}
      <Week />
    </div>
  );
}

export default App;
