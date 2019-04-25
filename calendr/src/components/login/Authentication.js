import React, { Component } from 'react'
import axios from 'axios';

const url = "http://localhost:3001/"

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

    componentDidMount(){
      if(localStorage.getItem('userdata')){
        const userdata = JSON.parse(localStorage.getItem('userdata'));
        axios.post(`${url}api/users/checkauth`, {token: userdata.token}).then(res => {
            res.data ? this.setState({ loggedIn: true}) : localStorage.clear();
        }).catch(error => console.log(error));
    }
    }

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
                 this.props.history.push('/users');
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
              />
    }
  }
}

export default Authentication
