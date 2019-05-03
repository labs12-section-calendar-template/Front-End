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
    //   if(localStorage.getItem('userdata')){
    //     const userdata = JSON.parse(localStorage.getItem('userdata'));
    //     axios.post(`${url}api/users/checkauth`, {token: userdata.token}).then(res => {
    //         res.data ? this.setState({ loggedIn: true}) : localStorage.clear();
    //     }).catch(error => console.log(error));
    //   }
    }

    gmailLogin = (event) => {
        event.preventDefault();
        window.location = 'http://localhost:3300/auth/google'
      }

    //http://localhost:3300/auth/google
    //https://calendrserver.herokuapp.com/auth/google



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
