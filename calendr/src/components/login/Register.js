import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components';

// Currently not being used. Meant for manual registration

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
  .post(`${url}auth/register`, {
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
          <FormContainer>
          <Form type = 'submit'>
          <Div>
            <H4>Fullname:</H4>
              <Input
              type = "text"
              value = {this.props.fullName}
              name = "fullName"
              onChange = {this.props.handleChanges}
              placeholder = "Full Name..."
              />
          </Div>
          <Div>
            <H4>Email:</H4>
              <Input
              type = "email"
              value = {this.props.email}
              name = "email"
              onChange = {this.props.handleChanges}
              placeholder = "Email..."
              />
          </Div>
          <Div>
            <H4>Username:</H4>
              <Input
              type = "text"
              value = {this.props.username}
              name = "username"
              onChange = {this.props.handleChanges}
              placeholder = "username..."
              />
          </Div>
          <Div>
            <H4>Password:</H4>
              <Input
              type = "password"
              value = {this.props.password}
              name = "password"
              onChange = {this.props.handleChanges}
              placeholder = "Password..."
              />
          </Div>
          <Div>
            <H4>Verify Password:</H4>
              <Input
              type = "verifypassword"
              value = {this.props.verifypassword}
              name = "verifypassword"
              onChange = {this.props.handleChanges}
              placeholder = "verifypassword..."
              />
          </Div>
          </Form>
          </FormContainer>
          <Button onClick = {this.props.register}>Register</Button>
        </div>
      )
  }
}
const FormContainer = styled.div`
  width:24rem;
  margin:auto;
  background-color:lightgrey;
  border-radius:10px;
  padding:2rem;
  
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items:flex-end;

`;
const Div = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;

`;
const H4 = styled.h4`
  margin:0 0 .5rem 0;

`;
const Input = styled.input`
  margin: 1rem;
  height:3rem;
  background: white;
  
`;
const Button = styled.button`
  margin: 1rem;
`;

export default Register
