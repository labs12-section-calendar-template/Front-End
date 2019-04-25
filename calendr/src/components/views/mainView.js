import React from 'react';
import MainNavBar from '../general/MainNavBar';
import Users from '../general/Users'

import { Route } from 'react-router-dom';

function mainView() {
    return (
      <div className="App">
       <MainNavBar/>
       <Route path="/users" component={Users} />
      </div>
    );
  }
  
  export default mainView;