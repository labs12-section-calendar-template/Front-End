import React, { Component } from 'react'
import axios from 'axios'

export class GroupEdit extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            joinCode:'',
            group_id:this.props.group_id,
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateGroup = e => {
        let userId = localStorage.getItem('userId')
        console.log(userId)
        console.log(this.state.joinCode)
    axios
        .put(`http://localhost:3300/groups/${this.state.group_id}`,{
            name:this.state.name,
            joinCode:this.state.joinCode,
            userId:userId
        })
        .then(res => {
          res.status(200).send('it worked')
        })
        .catch(err => {
          console.log(err)
        })
      }

  render() {
      console.log(this.state.group_id)
      
    return (
    <div className="popup-overlay" >
    <div className="popup-content">
      <div className="pop">
      <button className="cancel" onClick={this.props.toggleModal}>Cancel</button>
        <form>
            <h2>Enter new group name</h2>
            <input
                className="editNameInput editGroupInput"
                type = "text"
                value = {this.state.name}
                name = "name"
                onChange = {this.handleChange}
                placeholder = "Update group name..."
            />
            <h2>Enter new group code</h2>
             <input
                className="editJoinCodeInput editGroupInput"
                type = "number"
                value = {this.state.joinCode}
                name = "joinCode"
                onChange = {this.handleChange}
                placeholder = "Update join code..."
            />
            <button onClick={() => (this.updateGroup(), this.props.toggleModal())}>Submit</button>
        </form>
      </div>
    </div>
    </div>
    )
  }
}

export default GroupEdit
