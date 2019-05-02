import React from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import LoginView from "./components/views/loginView";
import MainView from "./components/views/mainView";
import Authenticate from "./components/login/Authentication";
import MarketingPage from "./components/general/MarketingPage";
import Month from './components/calendar/Month'
import GroupView from "./components/views/groupView";

// import Month from './components/calendar/Month'
// import Day from './components/calendar/Day'

function App() {
  return (
    // <Auth/>
    <div>
    <LoginView />
    </div>
    // <Month /> 
   // <MarketingPage />
  );
}

// const Auth = withRouter(Authenticate(MainView)(LoginView));

export default withRouter(App);
