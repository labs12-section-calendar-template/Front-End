import React, { Component } from 'react'
import SideBar from '../SideBar';
import GeneralCalendar from '../../calendar/GeneralCalendar';
import './Template.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import MainNavBar from '../../general/MainNavBar'

export class Template extends Component {
  constructor(props) {
    super(props);
    
this.state = {
    title: '',
    description: '',
    cycleLength: '',
    color: '',
    dateRange: ''
    }
}


handleCycleChange = event => {
  this.setState({
    cycleLength: event.target.value
  });
}

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

delayRedirect = event => {
  const { history: { push } } = this.props;
  event.preventDefault();
  setTimeout(()=>push('/home'), 1500);
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
          <div className='templateTitle'>
            <h1>Template Creation</h1>
            <Link to='/' onClick={this.delayRedirect}>
            <button id="buttonSave" onClick={this.addTemplate}>Save</button>
            </Link>
          </div>
          <div className='templateEdit'>
            <div className='cycleLength'>
              <h3>Cycle Length: {' '}
              <select value={this.state.cycleLength} onChange={this.handleCycleChange}>
                  <option>Select One</option>
                  <option value='four'>4 Weeks</option>
                  <option value='five'>5 Weeks</option>
                  <option value='six'>6 Weeks</option>
              </select>
              </h3>
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
    </div>
    )
  }
}

export default Template

