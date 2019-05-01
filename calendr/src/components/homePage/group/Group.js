import React, { Component } from 'react'

export class Group extends Component {
  render() {
    return (
      <div>
        <div className="createGroup">
            <h2>Create Group</h2>
            <p>You must be a Gold Tier Member to create a group</p>
            <input
            />
            <button>Create</button>
        </div>
        <div className="joinGroup">
            <h2>Join Group</h2>
            <p>After you join a group you will be able to see all events created by the owner of that group</p>
            <input
            />
            <button>Join</button>
        </div>
      </div>
    )
  }
}

export default Group
