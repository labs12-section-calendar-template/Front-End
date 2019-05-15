import React, { Component } from 'react'
import SideBar from '../SideBar';
import './Template.css';
import axios from 'axios';
import MainNavBar from '../../general/MainNavBar'

export class TemplateEdit extends Component {
  constructor(props) {
    super(props);
    
this.state = {
    colortitle: '',
    description: '',
    startDate: '',
    endDate: '',
    color: '',
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
  console.log(this.state.group_id)
axios
  .put(`${process.env.REACT_APP_API}/templates/${id}`,{
    title: this.state.title,
    description: this.state.description,
    cycleLength: this.state.cycleLength,
    startDate: this.state.startDate,
    endDate: this.state.endDate,
    color: this.state.color,
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

handleColorChange = event => {
  this.setState({
    color: event.target.value
  });
}

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
                  <div>
              <h3>Template Color: {' '}
              <select value={this.state.color} onChange={this.handleColorChange}>
                  <option>Select One</option>
                  <option value='red'>Red</option>
                  <option value='green'>Green</option>
                  <option value='blue'>Blue</option>
                  <option value='maroon'>Maroon</option>
                  <option value='teal'>Teal</option>
                  <option value='navy-blue'>Navy Blue</option>
                  <option value='orange'>Orange</option>
                  <option value='olive'>Olive</option>
              </select>
              </h3>
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