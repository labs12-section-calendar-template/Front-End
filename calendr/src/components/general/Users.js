import React, { Component } from 'react';
import axios from 'axios';
import './Users.css'
import MainNavBar from './MainNavBar';

const url = 'https://calendrserver.herokuapp.com/'
class Users extends Component {
    constructor() {
      super();
      this.state = {
        users: [],
      };
    }
    
  
  componentDidMount() {
    axios.get(`${url}users`)
    .then(response => {
      console.log(response)
    this.setState({ users:response.data })
    })
    .catch(err => {
      console.log(err)
    })
  }
  
    render() {
        console.log(this.state.users)
      return (
        <div >
        <MainNavBar/>
          <h1>Users</h1>
         {this.state.users.map((user) => (
            <p className='users'>{user.fullname}</p>
         ))}
        </div>
      );
    }
  }
  
  export default Users;