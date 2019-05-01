import React from 'react';
import MainNavBar from '../general/MainNavBar';
import Users from '../general/Users';
import Home from '../homePage/Home';
import Template from '../homePage/template/Template';
import Group from '../homePage/group/Group';
import { Route } from 'react-router-dom';

function mainView() {
    return (
      <div className="App">
       <MainNavBar/>
       <Route path="/" exact component={Home} />
       <Route path="/users" component={Users} />
       <Route path="/template" component={Template} />
       <Route path="/group" component={Group} />
      </div>
    );
  }
  
  export default mainView;