import React from "react";
import "../../App.scss";
import { Link } from "react-router-dom";
import iphonex from "../../extras/iphone-screen-cap.gif"
import desktop from "../../extras/desktop-screen-cap.gif"
import {Template} from '../homePage/template/Template'
import {Calendar} from 'antd'

const MarketingPage = () => {
  return (
    <div className="marketing-container">
      <header>
        <div className="header-content">
          <h1>Create solo and group calendars</h1>
          <p>
            Calendr is the easiest way for users/groups to plan, manage and
            visualize their work
          </p>
            <Link to="/login">
            <button className="marketingButton">Sign Up</button>
          </Link>
        </div>
      </header>

      <div className="middle-section">
        <div className="middle-top">
          <div className="card">
            <h2>With Calendr, group calendars are just one piece</h2>
            <p>
              With Calendr, group calendars can help you and your organization 
              stay organized by planning events according to a particular template
              that the admin creates. 
            </p>
          </div>
          
          <img
            className="placeholder iphoneX"
            src={iphonex}
            alt="something random"
          />
        </div>

        <div className="middle-section-top">
          <h2>Membership pricing</h2>
          <div className="card-container">
            <div className="card">
              <h4>Basic Membership</h4>
              <h5> Free </h5>
              <p>
                  Ability to create one group
              </p>
              <p>
                  Includes all main features
              </p>
              <p>
                Get to know Calendr risk-free
              </p>
              <Link to="/login">
                <button className="marketingButton">Sign Up Now </button>
              </Link>
            </div>

            <div className="card premium">
              <h4>Premium Membership</h4>
              <h5>9.99 / month</h5>
                <p>
                  Ability to create up to 5 total groups 
                </p>
                <p>
                    Includes all main features
                </p>
                <p>
                  Manage multiple groups and templates
                </p>
              <Link to="/login">
                <button className="marketingButton">Sign Up Now </button>
              </Link>
            </div>

          </div>
        </div>

        <div className="middle-section-bottom">
          <img
            className="placeholder desktop"
            src={desktop}
            alt="something random"
          />
          <div className="card">
            <h2> A group calendar with custom templates to fit your needs </h2>
            <p>
              Custom templates within Calendr is a key feature that helps your organization, 
              letting you know what events are going to occur according to the templates you've 
              created and selected to display on your calendar.
            </p>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <div>
          <h2> Give Calendr a try</h2>
          <p>
            Try Calendr now for FREE you won't be disappointed!
          </p>
          <Link to="/login">
            <button className="marketingButton">Sign Up </button>
          </Link>
        </div>
      </div>

      <footer>
        <h5>&copy; Calendr</h5>
      </footer>
    </div>
  );
};

export default MarketingPage;
