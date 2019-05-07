import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';

const url = "http://localhost:3000/"

const Authentication = App => Login =>
    class extends Component {
        constructor(props){
            super(props);
            this.state = ({
                username: '',
                password: '',
                loggedIn: false
            })
        }

    componentWillMount(){
        
        let query = queryString.parse(this.props.location.search);
        console.log(query.userId)
        console.log(query.token)
        if (query.token) {
            console.log(query.token)
          window.localStorage.setItem("jwt", query.token);
          window.localStorage.setItem("userId", query.userId);
          this.props.history.push("/");
          this.setState({
              loggedIn: true
          })
       }
       
    }

    componentDidMount(){
        console.log(localStorage.getItem('jwt'))
        if(localStorage.getItem('jwt')){
            this.setState({
                loggedIn: true
            })
        }
    }

    gmailLogin = (event) => {
        event.preventDefault();
        window.location = 'https://calendrserver.herokuapp.com/auth/google'
      }

      logOff = (event) => {
        event.preventDefault();
        window.localStorage.clear();
        this.setState({
            loggedIn: false
        });
        window.location = 'https://calendrserver.herokuapp.com/auth/logout'
      }

    //http://localhost:3300/auth/google
    //http://localhost:3300/auth/logout
    //https://calendrserver.herokuapp.com/auth/google
    //https://calendrserver.herokuapp.com/auth/logout



    handleChanges = event => {
        let { name, value } = event.target
        this.setState({
            [name]:value
        })
    }

    signIn = event => {
      event.persist();
      return axios
          .post(`${url}auth/login`,{
              username: this.state.username,
              password: this.state.password
          })

          .then( res => {
              localStorage.setItem("userdata", JSON.stringify(res.data));
              this.setState({
                  loggedIn: true
              });
                 this.props.history.push('/');
          })
          .catch(err => alert(err));
      }

      signOut = event => {
        event.preventDefault();
        window.localStorage.clear();
        this.setState({
            loggedIn: false
        })
        this.props.history.push('/login');

    }

  render() {
    
    if(this.state.loggedIn){
      return <App signOut = {this.signOut}
      loggedIn = {this.state.loggedIn}
      logOff = {this.logOff}
      />
   } else {
       return <Login 
              handleChanges = {this.handleChanges}
              signIn = {this.signIn}
              username = {this.state.username}
              password = {this.state.password}
              gmailLogin = {this.gmailLogin}
              />
    }
  }
}

export default Authentication
