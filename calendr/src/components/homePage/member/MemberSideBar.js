import React, { Component } from 'react'
import { NavLink } from 'react-router-dom' 
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
      <div className = "header">
        <div id = "memberNavIcon" onClick = {this.toggleModal}> <i className = "fa fa-bars" aria-hidden="true"/><p>Menu</p> </div>
        
        <div className={this.state.modalOpen ? "memberNavDiv": "memberNavOpen"}>
        <div className="homePageStyles">
        <div className="groupNameTemplate">
          <h5 className='GroupName'>Group Name</h5>
            <div className='buttonBox'>
                <h3 className = "GroupName">{this.props.group.name}</h3>
            </div>

          <h5 className='buttonTitles'>Templates</h5>
            <div>
                {this.props.templates.map(template => 
                  {return <div key={template.id} 
                  value = {template.id} className="template-list-items">
                  <input
                  className="each-template-input"
                  type="checkbox"
                  name={template.id}
                  check={template.isChecked}
                  value={template.id}
                  onClick={this.props.singleCheck}
                  />    
                  <NavLink className="each-template-name" 
                  //style={{color:this.props.colors[template.id % 6]}}  
                  onClick={() => {this.switchTemplate(template.id)}}
                  >{template.title}</NavLink>
                </div>
                })} 
                </div>
              </div>
            </div>
        </div>
        </div>
      </>
    )
  }
}

export default MemberSideBar