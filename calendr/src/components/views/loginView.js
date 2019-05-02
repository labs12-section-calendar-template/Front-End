import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from '../login/Login'
import Register from '../login/Register'
import NavBar from '../login/NavBar'
import MarketingPage from '../general/MarketingPage'


export class loginView extends Component {
  constructor(props) {
    super(props);
    this.state = {}
}

  render() {
    return (
      <div>
        <NavBar/>
            <Route exact path="/" component={MarketingPage} />
            <Route exact path='/login' render = {(...props) => (<Login
            handleChanges = {this.props.handleChanges}
            signIn = {this.props.signIn}
            password = {this.state.password}
            username = {this.state.username}
            gmailLogin = {this.props.gmailLogin}
            {...props}
            />)}/>
            <Route exact path='/register' component = {Register}/>
      </div>
    )
  }
}

export default loginView
