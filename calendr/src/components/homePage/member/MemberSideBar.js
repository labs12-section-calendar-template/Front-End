import React, { Component } from 'react'
import axios from 'axios';
// import Popup from 'reactjs-popup';

export class MemberSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true
    }
  }

  toggleModal = () => {
    if (this.state.modalOpen === false) {
      this.setState({
        modalOpen: true,
      })
    } else {
      this.setState({
        modalOpen: false
      })
    }
  }

  render() {
    return (
      <>
        <div className = "buttn" onClick = {this.toggleModal}> <i className = "fa fa-bars" aria-hidden="true"/> Templates </div>
        
        <div className={this.state.modalOpen ? "SideBarOpen": "closes"}>

          <h5 className='buttonTitles'>Group Name</h5>
            <div className='buttonBox'>
                <h3 className = "GroupName">{this.props.group.name}</h3>
            </div>

          <h5 className='buttonTitles'>Templates</h5>
            <div>
                {this.props.templates.map(template => {return <div key={template.id} value = {template.id}>
                  <input
                  type="checkbox"
                  name={template.id}
                  check={template.isChecked}
                  value={template.id}
                  onClick={this.props.singleCheck}
                  />    
                  
                  <h5>{template.title}</h5>
          
                </div>
                })} 
            </div>
        </div>

      </>
    )
  }
}

export default MemberSideBar