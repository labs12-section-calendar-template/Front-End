import React from "react";
import "./App.css";
import { withRouter, Switch } from "react-router-dom";
import LoginView from "./components/views/loginView";
import MainView from "./components/views/mainView";
import Authenticate from "./components/login/Authentication";

function App() {
  return (
    <div>
      <Switch>
        <Auth/>
      </Switch>
    </div>
  );
}

const Auth = withRouter(Authenticate(MainView)(LoginView));

export default withRouter(App);
