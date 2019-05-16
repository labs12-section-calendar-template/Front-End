import React, { Component } from 'react'
import SideBar from '../SideBar';
import './Template.css';
import axios from 'axios';
import MainNavBar from '../../general/MainNavBar'
import moment from 'moment';
import { toast } from 'react-toastify';

export class TemplateEdit extends Component {
  constructor(props) {
    super(props);
    
this.state = {
    colortitle: '',
    description: '',
    startDate: '',
    endDate: '',
    date: '',
    // templates:[],
    group_id:[]
    }
}

// getTemplate = event => {
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
// }

updateTemplate = (e) => {
  let letMeBack = localStorage.getItem('group_id')
  let id = this.props.match.params.id
  let { title, description, startDate, endDate } = this.state;
  console.log(this.state.group_id)
  if(title < 1 || description < 1 || startDate !== moment(startDate).format('YYYY-MM-DD') || endDate !== moment(endDate).format('YYYY-MM-DD') ) {
    toast('Please enter all fields to create a template')
  } else {
axios
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
  })
  .catch(err => {
    console.log(err)
  })
}
}

handleStartDateChange = event => {
  this.setState({
    startDate: event.target.value
  });
};

handleEndDateChange = event => {
  this.setState({
    endDate: event.target.value
  });
};

handleInputChange = event => {
  this.setState({
      [event.target.name]: event.target.value
  })
}
cancel = () => {
  window.location = '/home'
}

  render() {
  
    return (
    <div>
      <MainNavBar/>
      <div className="templateCreation">
        <aside className="groupTemplateInfo">
          <SideBar /> 
        </aside>
        <main className="templateMain">
        <button onClick={this.cancel}>Cancel</button>
          <div className='templateTitle'>
            <h1>Update Template</h1>
           
            <button id="buttonSave" onClick={this.updateTemplate}>Update</button>
          
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
                <li> 
                  <h3>Title: </h3>
                  <input 
                    onChange={this.handleInputChange}
                    placeholder="Title"
                    value={this.state.title}
                    name="title" 
                    /> 
                </li>
                <li> 
                  <h3>Description: </h3>
                  <input 
                    onChange={this.handleInputChange}
                    placeholder="Description"
                    value={this.state.description}
                    name="description"
                    /> 
                </li>
              </form>
          </div>
        </main>
      </div>
    </div>
    )
  }
}

export default TemplateEdit