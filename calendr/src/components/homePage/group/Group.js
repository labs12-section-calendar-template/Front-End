import React, { Component } from 'react'
import "./Group.scss"
import axios from 'axios'

export class Group extends Component {
  constructor(props){
    super(props);
    this.state={
        joinCode: '',
        createdCode: '',
        name: '',
    }
  }
    
    postGroup = e => {
      e.preventDefault();
      let { name, joinCode } = this.state
      let user_id = localStorage.getItem('userId')
      axios
        .post(`http://localhost:3300/users/${user_id}/groups`, { user_id, name, joinCode })
        .then(res => {
          console.log(res.data);
          if(this.state.joinCode !== null && this.state.name !== null){
            window.location='/home'
          }else{
            alert('Fill out all fields')
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    

handleInputChange = event => {
  this.setState({
      [event.target.name]: event.target.value
  })
}

  render() {
    return (
      <>
      <div className = "groupHeader">
          <button onClick = {this.props.logOff}> Let me Out</button>
      </div>
      <div className="groupContainer">
        <div className="createGroup boxing">
            <h2 className="joinCreateGroup">Create Group</h2>
            <p className="groupDescription">You must be a Gold Tier Member to create a group</p>
          <form className="formGroup" onSubmit={this.postGroup}>
            <h3>Enter Group Name</h3>
            <input
            className="groupInput"
            onChange={this.handleInputChange}
            placeholder="Group name..."
            value={this.state.name}
            name="name"
            type="text"
            />
            <h3>Create 4 digit Join Code</h3>
            <input
            className="groupInput"
            onChange={this.handleInputChange}
            placeholder="Join code..."
            value={this.state.joinCode}
            name="joinCode"
            type="number"
            />
            <button className="formButton">Create</button>
          </form>
        </div>
        <div className="joinGroup boxing">
            <h2 className="joinCreateGroup">Join Group</h2>
            <p className="groupDescription">After you join a group you will be able to see all events created by the owner of that group</p>
           <form className="formGroup">
           <h3>Enter 4 digit Join Code</h3>
            <input
            className="groupInput"
            onChange={this.handleInputChange}
            placeholder="Join code..."
            value={this.state.joinCode}
            name="joinCode" 
            type="number"
            />
            <button className="formButton">Join</button>
            
           </form>
        </div>
      </div>
      </>
    )
  }
}

export default Group