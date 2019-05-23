import React, { Component } from 'react'
import SideBar from '../SideBar';
import "../../../App.scss";
import axios from 'axios';
import MainNavBar from '../../general/MainNavBar'
import moment from 'moment';
import { toast } from 'react-toastify';
import axiosCustom from '../../../axiosCustom';

export class TemplateEdit extends Component {
  constructor(props) {
    super(props);
    
this.state = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    date: '',
    // templates:[],
    group_id:[]
    }
}

// Probably not needed
getTemplate = event => {
//   let group_id = localStorage.getItem("group_id")
//   console.log(group_id)
//   axios
//     .get(`http://localhost:3300/groups/${group_id}/templates` )
//     .then(res => {
//       console.log(res.data);
//       this.setState({
//         templates: res.data
//       })
//     })
//     .catch(err => {
//       console.log(err);
//     });
}

// updating template information
updateTemplate = (e) => {
  let letMeBack = localStorage.getItem('group_id')
  let id = this.props.match.params.id
  let { title, description, startDate, endDate } = this.state;
  console.log(this.state.group_id)
  if(title < 1 || description < 1) {
    toast.error('Please enter all fields to create a template')
  } else if(startDate !== moment(startDate).format('YYYY-MM-DD') || endDate !== moment(endDate).format('YYYY-MM-DD')) {
   toast.error('Please input the date fields correctly')
  } else {

axiosCustom
  .put(`${process.env.REACT_APP_API}/templates/${id}`,{
    title,
    description,
    startDate,
    endDate,
  })
  .then(res => {
    console.log('IT WORKED')
    console.log(res.data)
    window.location=`/home/${letMeBack}`;
    toast.success('Template updated')
  })
  .catch(err => {
    console.log(err)
    toast.error('There was an error updating your template')
  })
}
}

// handles input for startDate and sets to state
handleStartDateChange = event => {
  this.setState({
    startDate: event.target.value
  });
};

// handles input for endDate and sets to state
handleEndDateChange = event => {
  this.setState({
    endDate: event.target.value
  });
};

// handles input and sets to state
handleInputChange = event => {
  this.setState({
      [event.target.name]: event.target.value
  })
}

// cancel the update and return to previous page
cancel = () => {
  let letMeBack = localStorage.getItem('group_id')
  window.location = `/home/${letMeBack}`
}

  render() {
    return (
    <div className='template-edit-container'>
      <MainNavBar logOff={this.props.logOff}/>
      <div className="templateCreation">
        <aside className="groupTemplateInfo">
          <SideBar /> 
        </aside>
        <main className="templateMain">
          <div className='templateTitle'>
            <h1>Update Template</h1>
          </div>
          <div className='templateEdit'>
          <div className="startDate">
                <h3>Start Date:</h3>
                  <input
                    value={this.state.startDate}
                    onChange={this.handleStartDateChange}
                    type="text"
                    name="startDate"
                    placeholder="YYYY-MM-DD"
                  />
                  <h3>End Date:</h3>
                  <input
                    value={this.state.endDate}
                    onChange={this.handleEndDateChange}
                    type="text"
                    name="endDate"
                    placeholder="YYYY-MM-DD"
                  />
                  </div>
              <form>
                  <h3>Title: </h3>
                  <input 
                    onChange={this.handleInputChange}
                    placeholder="Title"
                    value={this.state.title}
                    name="title" 
                    />
                  <h3>Description: </h3>
                  <input 
                    onChange={this.handleInputChange}
                    placeholder="Description"
                    value={this.state.description}
                    name="description"
                    />
              </form>
              <div className="cancel-save">
              <button id="buttonSaveCancel" onClick={this.updateTemplate}>Update</button>
            </div>
          </div>
        </main>
      </div>
    </div>
    )
  }
}

export default TemplateEdit