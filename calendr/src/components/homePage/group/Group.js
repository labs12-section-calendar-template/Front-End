import React, { Component } from 'react'
import "./Group.scss"
import axios from 'axios'
import { toast } from 'react-toastify'

export class Group extends Component {
  constructor(props){
    super(props);
    this.state={
        joinCode: '',
        createdCode: '',
        name: ''
    }
  }


    joinGroup = event => {
      event.preventDefault();
      let user_id = localStorage.getItem('userId')
      axios
        .post(`${process.env.REACT_APP_API}/groups/getby/${user_id}`, {
          joinCode: this.state.joinCode
        }).then(res => {
          console.log(res.data)
          window.localStorage.setItem('joinCode', this.state.joinCode)
          window.localStorage.setItem('group_id', res.data.group.id)
          window.location = '/memberhome'
        }).catch(err => {
          console.error(err, 'there was an error')
          toast('There was an error joining a group. Please use a valid join code.')
        })
    }
    
    postGroup = e => {
      e.preventDefault();
      let { name } = this.state
      let {joinCode} = this.state.createdCode
      let user_id = localStorage.getItem('userId')
      if (!name || !joinCode) {
        toast('Please Enter a Group Name and a Join Code.')
      }
      axios
        .post(`${process.env.REACT_APP_API}/users/${user_id}/groups`, { user_id, name, joinCode: this.state.createdCode }) // <== this needs to be createCode
        .then(res => {
          window.localStorage.setItem("group_id", res.data.id)
          console.log(res.data);
          if(this.state.createdCode !== null && this.state.name !== null){
            window.location=`/home/${res.data.id}`
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
          <form className="formGroup">
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
            value={this.state.createdCode}
            name="createdCode"
            type="number"
            />
            <button onClick={this.postGroup} className="formButton">Create</button>
          </form>
        </div>

        {/* JOINING A GROUP SECTION STARTS */}
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
                <button onClick = {this.joinGroup} className="formButton">Join</button>
                
           </form>
        </div>
      </div>
      </>
    )
  }
}

export default Group