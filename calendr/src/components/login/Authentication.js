import React, { Component } from 'react';
import queryString from 'query-string';
// import axios from 'axios';

// const url = "http://localhost:3000/";
// const localGoogle = 'http://localhost:3300/auth/google';
// const deployedGoogle = 'https://calendrserver.herokuapp.com/auth/google';

const Authentication = App => Login =>
    class extends Component {
        constructor(props){
            super(props);
            this.state = ({
                username: '',
                password: '',
                loggedIn: false,
                check: []
            })
        }

    componentWillMount(){
        
        let query = queryString.parse(this.props.location.search);
    
        if (query.token) {
          console.log(query.token)
          window.localStorage.setItem("jwt", query.token);
          window.localStorage.setItem("userId", query.userId);
          window.localStorage.setItem('group_id', query.group_id)
        }
    }

    componentDidMount(){
        console.log(localStorage.getItem('jwt'))
        if(localStorage.getItem('jwt')){
            this.setState({
                loggedIn: true
            })

            this.props.history.push(window.location.pathname) //This will cause the page to refresh to it's current pathname
        } else {
            this.setState({
                loggedIn: false
            })
        }
    }

    gmailLogin = (event) => {
        // event.preventDefault();
        // let url = window.location = `${process.env.REACT_APP_API}/auth/google`
        // console.log(url)
        //window.location = `${process.env.REACT_APP_API}/auth/google`
      }

      logOff = (event) => {
        window.localStorage.clear();
        this.setState({
            loggedIn: false
        }, ()=> {window.location = `${process.env.REACT_APP_API}/auth/logout` });
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

    // signIn = event => {
    //   event.persist();
    //   return axios
    //       .post(`${url}auth/login`,{
    //           username: this.state.username,
    //           password: this.state.password
    //       })

    //       .then( res => {
    //           localStorage.setItem("userdata", JSON.stringify(res.data));
    //           this.setState({
    //               loggedIn: true
    //           });
    //              this.props.history.push('/');
    //       })
    //       .catch(err => alert(err));
    //   }

      signOut = event => {
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
