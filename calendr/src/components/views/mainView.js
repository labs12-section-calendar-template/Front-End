import React from 'react';
import NavBar from '../../components/general/NavBar';
import MarketingPage from '../../components/general/MarketingPage'
import Users from '../../components/general/Users'

import { Route } from 'react-router-dom';

function mainView() {
    return (
      <div className="App">
       <NavBar/>
       <Route exact path="/" component={MarketingPage} />
       <Route path="/users" component={Users} />
      </div>
    );
  }
  
  export default mainView;