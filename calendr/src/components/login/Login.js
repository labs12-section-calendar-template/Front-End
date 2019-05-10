import React from 'react'
import './Login.scss'
import googleSignIn from '../../extras/googleSignIn.png'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "",
      clientSecret: "",
    }
  }

  render() { 
    return ( 
        <div>
          <h2>Welcome, Please login</h2>
          {/* <div className="formContainer"> */}
          {/* <Form type='submit'>
          <Div>
            <H4>Username:</H4>
              <Input
              type = "text"
              value = {this.props.username}
              name = "username"
              onChange = {this.props.handleChanges}
              placeholder = "Username..."
              />
            </Div>
            <Div>
              <H4>Password:</H4>
              <Input
              type = "text"
              value = {this.props.password}
              name = "password"
              onChange = {this.props.handleChanges}
              placeholder = "Password..."
              />
            </Div>
          </Form> */}
           <img className='googleSignIn' onClick = {this.props.gmailLogin} src={googleSignIn} alt='Google Sign In'/>
          {/* </div> */}
          {/* <Button onClick = {this.props.signIn}>Login</Button> */}
        </div>
        
     );
  }
}

export default Login

