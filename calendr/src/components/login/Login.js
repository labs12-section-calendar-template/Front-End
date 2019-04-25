import React from 'react'
import styled from 'styled-components';

const Login = (props) => {
  return (
    <div>
      <h2>Welcome, Please login</h2>
      <FormContainer>
      <Form type='submit'>
      <Div>
        <H4>Username:</H4>
          <Input
          type = "text"
          value = {props.username}
          name = "username"
          onChange = {props.handleChanges}
          placeholder = "Username..."
          />
        </Div>
        <Div>
          <H4>Password:</H4>
          <Input
          type = "text"
          value = {props.password}
          name = "password"
          onChange = {props.handleChanges}
          placeholder = "Password..."
          />
        </Div>
      </Form>
      </FormContainer>
      <Button onClick = {props.signIn}>Login</Button>
    </div>
    )
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

export default Login

