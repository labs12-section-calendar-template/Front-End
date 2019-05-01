import React, { Component } from 'react'
import SideBar from '../SideBar';
import GeneralCalendar from '../../calendar/GeneralCalendar';
import './Template.css'

export class Template extends Component {
  constructor(props) {
    super(props);
    
this.state = {
    title: '',
    description: '',
    value: ''
    }
}

handleChange = event => {
  this.setState({
    value: event.target.value
  });
}

handleInputChange = event => {
  this.setState({
      [event.target.name]: event.target.value
  })
}


  render() {
    return (
      <div className="templateCreation">
        <aside className="groupTemplateInfo">
          <SideBar /> 
        </aside>
        <main className="templateMain">
          <div className='templateTitle'>
            <h1>Template Creation</h1>
            <button id="buttonSave">Save</button>
          </div>
          <div className='templateEdit'>
            <div className='cycleLength'>
              <h3>Cycle Length: {' '}
              <select value={this.state.value} onChange={this.handleChange}>
                  <option value='four'>4 Weeks</option>
                  <option value='five'>5 Weeks</option>
                  <option value='six'>6 Weeks</option>
              </select>
              </h3>
            </div>
              <form>
                <li> 
                  <input 
                    onChange={this.handleInputChange}
                    placeholder="Title"
                    value={this.state.title}
                    name="title" 
                    /> 
                </li>
                <li> 
                  <input 
                    onChange={this.handleInputChange}
                    placeholder="Description"
                    value={this.state.description}
                    name="description"
                    /> 
                </li>
              </form>
              <GeneralCalendar />
          </div>
        </main>
      </div>
    )
  }
}

export default Template

