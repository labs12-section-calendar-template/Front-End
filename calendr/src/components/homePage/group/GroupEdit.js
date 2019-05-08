import React, { Component } from 'react'
import axios from 'axios'

export class GroupEdit extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            group_id: this.props.group_id,
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateGroup = event => {
        let userId = localStorage.getItem('userId')
        console.log(userId)
        console.log(this.state.joinCode)
        console.log(this.state.name)
    axios
        .put(`http://localhost:3300/groups/${this.state.group_id}`,{
            name: this.state.name,
            user_id: userId
        })
        .then(res => {
          console.log('IT WORKED')
          document.location.reload()
        })
        .catch(err => {
          console.log(err)
        })
      }

      deleteGroup = e => {
        e.preventDefault()
        axios
            .delete(`http://localhost:3300/groups/${this.props.group_id}`)
            .then(res => {
              console.log('group deleted')
              window.location = '/';
            })
            .catch(err => {
              console.log(err)
            })
          }

  render() {
      console.log(this.props.group_id)
      
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
            <button onClick={() => (this.updateGroup(), this.props.toggleModal())}>Submit</button>
            <button onClick={this.deleteGroup}>Delete Group</button>
        </form>
      </div>
    </div>
    </div>
    )
  }
}

export default GroupEdit
