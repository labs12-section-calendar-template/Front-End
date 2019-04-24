import React, { Component } from 'react'

const Authentication = App => Login =>
    class extends Component {
    state ={
        username: '',
        password: '',
        loggedIn: false
    }

    componentDidMount(){
        
    }

    handleChanges = event => {
        let { name, value } = event.target
        this.setState({
            [name]:value
        })
    }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Authentication
