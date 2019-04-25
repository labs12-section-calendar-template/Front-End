import React from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import LoginView from "./components/views/loginView";
import MainView from "./components/views/mainView";
import Authenticate from "./components/login/Authentication";

// import Month from './components/calendar/Month'
// import Day from './components/calendar/Day'

function App() {
  return (
    // <Auth/>
    <MainView />
  );
}

// const Auth = withRouter(Authenticate(mainView)(LoginView));

export default withRouter(App);
