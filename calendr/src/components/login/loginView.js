import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

export class loginView extends Component {
  render() {
    return (
      <div>
            <Route exact path='/login' render = {() => (<Login
            handleChanges = {this.props.handleChanges}
            signIn = {this.props.signIn}
            password = {this.state.password}
            username = {this.state.username}
            {...props}
            />)}/>
            <Route exact path='/register' component = {Register}/>
      </div>
    )
  }
}

export default loginView
