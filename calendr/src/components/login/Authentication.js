import React, { Component } from 'react';
import queryString from 'query-string';

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

        // componentWillMount sets authentication items to localStorage
    componentWillMount(){
        let query = queryString.parse(this.props.location.search);
        if (query.token) {
          console.log(query.token)
          window.localStorage.setItem("jwt", query.token);
          window.localStorage.setItem("userId", query.userId);
          window.localStorage.setItem('group_id', query.group_id)
        }
    }

    // componentDidMount confirms if a user is logged in or not
    componentDidMount(){
        console.log(localStorage.getItem('jwt'))
        if(localStorage.getItem('jwt')){
            this.setState({
                loggedIn: true
            })
            //This will cause the page to refresh to it's current pathname
            this.props.history.push(window.location.pathname) 
        } else {
            this.setState({
                loggedIn: false
            })
        }
    }

    // login function and redirect
    gmailLogin = (event) => {
        event.preventDefault();
        let url = window.location = `${process.env.REACT_APP_API}/auth/google`
        console.log(url)
        window.location = `${process.env.REACT_APP_API}/auth/google`
      }

      // Log out function and redirect
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


      // Takes input and sets them to state
    handleChanges = event => {
        let { name, value } = event.target
        this.setState({
            [name]:value
        })
    }

    // Probably not needed
    signIn = event => {
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
    }

    // Probably not needed
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
