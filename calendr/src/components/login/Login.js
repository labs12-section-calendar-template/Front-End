import React, { Component } from 'react'

export class Login extends Component {
  render() {
    return (
      <div>
      <h2>Welcome, Please login</h2>
      <form type='submit'>
          <input
          type = "text"
          value = {this.props.username}
          name = "username"
          onChange = {this.props.handleChanges}
          placeholder = "Username..."
          />
          <input
          type = "text"
          value = {this.props.password}
          name = "password"
          onChange = {this.props.handleChanges}
          placeholder = "Password..."
          />
      </form>
      <button onClick = {this.props.signIn}>Login</button>
    </div>
    )
  }
}

export default Login

