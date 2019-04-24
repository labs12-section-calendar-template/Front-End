import React, { Component } from 'react'

const url = "https://calendrserver.herokuapp.com/"
export class Register extends Component {
    state = {
      fullname: '',
      username: '',
      email: '',
      password: '',
      verifypassword: ''
    }

    handleChanges = event => {
      event.preventDefault();
      this.setState({
          [event.target.name]: event.target.value
      })
  }

  register = event => {
    event.preventDefault();
    let { fullname, username, email, password } = this.state
    if(this.state.password === this.state.verifypassword){
  axios
  .post(`${url}users/register`, {
        fullname: fullname,
        username: username,
        email: email,
        password: password
    })

  .then(res => {
        console.log('Its working', res)
        alert('Account registration is successful')
    })

  .catch( error => console.log('OH NO', error));

    this.setState({
            fullname: '',
            username: '',
            email: '',
            password: '',
            verifypassword: ''
    })} else {
        alert('Password does not match!')
        this.setState({
            fullname: '',
            username: '',
            email: '',
            password: '',
            verifypassword: ''
    })
        
    }
}

  render() {
    return (
        <div>
          <h2>Welcome, Please Register</h2>
          <form type = 'submit'>
              <input
              type = "text"
              value = {this.props.fullName}
              name = "fullName"
              onChange = {this.props.handleChanges}
              placeholder = "Full Name..."
              />
              <input
             type = "email"
             value = {this.props.email}
             name = "email"
             onChange = {this.props.handleChanges}
             placeholder = "Email..."
             />
              <input
              type = "text"
              value = {this.props.username}
              name = "username"
              onChange = {this.props.handleChanges}
              placeholder = "username..."
              />
              <input
              type = "password"
              value = {this.props.password}
              name = "password"
              onChange = {this.props.handleChanges}
              placeholder = "Password..."
              />
          </form>
          <button onClick = {this.props.register}>Register</button>
        </div>
      )
  }
}

export default Register
