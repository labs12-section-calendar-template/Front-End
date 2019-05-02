import React, { Component } from 'react'
import "./Group.css"
export class Group extends Component {
    state={
        joinCode: null,
        createdCode: null,
        name: '',
    }


handleInputChange = event => {
  this.setState({
      [event.target.name]: event.target.value
  })
}

  render() {
    return (
      <div className="groupContainer">
        <div className="createGroup boxing">
            <h2 className="joinCreateGroup">Create Group</h2>
            <p className="groupDescription">You must be a Gold Tier Member to create a group</p>
          <form className="formGroup">
            <h3>Enter Group Name</h3>
            <input
            className="groupInput"
            onChange={this.handleInputChange}
            placeholder="Group name..."
            value={this.state.name}
            name="name"
            />
            <h3>Create 4 digit Join Code</h3>
            <input
            className="groupInput"
            onChange={this.handleInputChange}
            placeholder="Join code..."
            value={this.state.createdCode}
            name="createdCode"
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
            />
            <button className="formButton">Join</button>
           </form>
        </div>
      </div>
    )
  }
}

export default Group
