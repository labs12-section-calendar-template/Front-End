import React from 'react'

const Login = (props) => {
  return (
    <div>
      <h2>Welcome, Please login</h2>
      <form type='submit'>

          <input
          type = "text"
          value = {props.username}
          name = "username"
          onChange = {props.handleChanges}
          placeholder = "Username..."
          />
          
          <input
          type = "text"
          value = {props.password}
          name = "password"
          onChange = {props.handleChanges}
          placeholder = "Password..."
          />
      </form>
      <button onClick = {props.signIn}>Login</button>
    </div>
  )
}

export default Login
