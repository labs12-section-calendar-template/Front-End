import React, { Component } from "react";
import axios from "axios";
import "../../../App.scss";
import { toast } from "react-toastify";

export class GroupEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      group_id: []
    };
  }

  // Takes in the inputs and sets them to state
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // update group page to change current information on group
  updateGroup = event => {
    let userId = localStorage.getItem("userId");
    console.log(userId);
    console.log(this.state.joinCode);
    console.log(this.state.name);
    axios
      .put(`${process.env.REACT_APP_API}/groups/${this.props.group_id}`, {
        name: this.state.name,
        user_id: userId
      })
      .then(res => {
        console.log("IT WORKED");
        toast('Your group has been updated!')
        document.location.reload();
      })
      .catch(err => {
        console.log(err);
        toast('Please enter a new name to update your group')
      });
  };

  // removes all information on group including templates and events
  deleteGroup = e => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_API}/groups/${this.props.group_id}`)
      .then(res => {
        console.log("group deleted");
        
        if(this.props.groups.length === 1) {
         window.location = "/"
    
         } else {
           localStorage.setItem('group_id', this.props.groups[this.props.groups.length - 2].id)
           window.location=`/home/${this.props.groups[this.props.groups.length - 2].id}`
           
        }
        
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.props.group_id);

    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <div className="pop">
            <button className="cancel-button" onClick={this.props.toggleModal}>
              Cancel
            </button>
            <form className="editGroupName">
              <h2>Enter new group name</h2>
              <input
                className="editNameInput editGroupInput"
                type="text"
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
                placeholder="Update group name..."
              />
              <button
                className="edit-submit-button"
                onClick={() => (this.updateGroup(), this.props.toggleModal())}
              >
                Submit
              </button>
              <button className="edit-delete-group" onClick={this.deleteGroup}>
                Delete Group
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupEdit;
