import React from 'react';
import MainNavBar from '../general/MainNavBar';
import Users from '../general/Users';
import Home from '../homePage/home/Home';
import Template from '../homePage/template/Template';
import { Route } from 'react-router-dom';
import Group from '../homePage/group/Group';
import Event from '../homePage/event/Event';

function mainView() {
    return (
      <div className="App">
       <Route path="/" exact component={Group} />
       <Route path="/home" component={Home} />
       <Route path="/users" component={Users} />
       <Route path="/template" component={Template} />
       <Route path="/event" component={Event} />
      </div>
    );
  }
  
  export default mainView;