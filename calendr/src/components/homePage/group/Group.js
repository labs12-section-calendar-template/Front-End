import React, { Component } from 'react'
import "./Group.css"
export class Group extends Component {
    state={
        join: '',
        name: '',
    }
  render() {
    return (
      <div className="groupContainer">
        <div className="createGroup boxing">
            <h2 className="joinCreateGroup">Create Group</h2>
            <p className="groupDescription">You must be a Gold Tier Member to create a group</p>
          <form className="formGroup">
            <input
            className="groupInput"
            onChange={this.handleInputChange}
            placeholder="Group name..."
            value={this.state.name}
            name="name"
            />
            <button className="formButton">Create</button>
          </form>
        </div>
        <div className="joinGroup boxing">
            <h2 className="joinCreateGroup">Join Group</h2>
            <p className="groupDescription">After you join a group you will be able to see all events created by the owner of that group</p>
           <form className="formGroup">
            <input
            className="groupInput"
            onChange={this.handleInputChange}
            placeholder="Join code..."
            value={this.state.join}
            name="join" 
            />
            <button className="formButton">Join</button>
           </form>
        </div>
      </div>
    )
  }
}

export default Group
