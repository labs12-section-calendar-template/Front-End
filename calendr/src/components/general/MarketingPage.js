import React from "react";
import "../../App.scss";
import { Link } from "react-router-dom";
import iphonex from "../../extras/iphone-screen-cap.gif"
import desktop from "../../extras/desktop-screen-cap.gif"

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
              lorem ipsum dolor sit amet, consectetur adipisicing elit, Duis
              aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
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
              <h4>Free Membership</h4>
              <h5> Free </h5>
              <p>
                lorem ipsum dolor sit amet, consectetur adipisicing elit, Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <Link to="/login">
                <button className="marketingButton" href="/login">Sign Up Now </button>
              </Link>
            </div>

            <div className="card">
              <h4>Premium Membership</h4>
              <h5>9.99 / month</h5>
              <p>
                lorem ipsum dolor sit amet, consectetur adipisicing elit, Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <Link to="/login">
                <button className="marketingButton" href="/login">Sign Up Now </button>
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
              lorem ipsum dolor sit amet, consectetur adipisicing elit, Duis
              aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </p>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <div>
          <h2> Give Calendr a try</h2>
          <p>
            lorem ipsum dolor sit amet, consectetur adipisicing elit, Duis aute
            irure dolor in reprehenderit.
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
