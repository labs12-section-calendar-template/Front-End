import React from 'react'
import './MarketingStyles.css'
import placeHolder from '../../extras/filler.jpg'

const MarketingPage = () => {
  return (
    <div className="marketing-container">
      <header>
        <div className="header-content">
          <h1>Create solo and group calendars</h1>
          <p>Calendr is the easiest way for users/groups to plan, manage and visualize their work</p>
          <button>Sign Up</button>
          </div>
        </header>

        <div className="middle-section">
        <div className="middle-top">
          <div className="card">
            <h2>With Calendr, group calendars are just one piece</h2>
            <p>lorem ipsum dolor sit amet, consectetur adipisicing elit,
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
                <img className="placeholder" src= {placeHolder}/>
          </div>
          
          <div className='middle-section-top'>
            <h2>Using Calendr, you can...</h2>
            <div className="card-container">
                <div className="card">
                  <h4>Switch between templates</h4>
                  <p>lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                
                <div className="card">
                  <h4>See what events your group added</h4>
                  <p>lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>

                <div className="card">
                  <h4>Have it all integrated with one calendar</h4>
                  <p>lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
          </div>
        
        <div className="middle-section-bottom">
              <img className="placeholder" src= {placeHolder}/>
            <div className="card">
              <h2> A group calendar with custom templates to fit your needs </h2>
              <p>lorem ipsum dolor sit amet, consectetur adipisicing elit,
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        </div>

          <div className="bottom-section">
            <div>
              <h2> Give Calendr a try</h2>
              <p>lorem ipsum dolor sit amet, consectetur adipisicing elit,
                Duis aute irure dolor in reprehenderit.</p>
                <button>Sign Up </button>
              </div>
          </div>


          <footer>
            <h5>&copy; Calendr</h5>
          </footer>
    </div>
  )
}

export default MarketingPage
