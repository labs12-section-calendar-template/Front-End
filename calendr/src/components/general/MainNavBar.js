import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
// import AccountCircle from "@material-ui/icons/AccountCircle";
import logo from '../../extras/CalendrWhite.png';


const MainNavBar = () => {
  return (
    <div>
       <AppBar position="static"
        style={{backgroundColor:"#3270EB"}}>
        
          <Toolbar
            style={{
              margin: "0 10%",
              maxWidth: "1280px",
              display: "flex",
              justifyContent: "space-between",
              padding:"0"
            }}
          >
            <Typography variant="h6" color="inherit">
         <img 
                style={{
                    maxWidth: "90px",
                    maxHeight: "90px"
                }}
                src={logo} alt="Logo" /> 
            </Typography>
            <span
            style={{
              fontSize: "32px",
              letterSpacing: "1.5px"
            }}> CALENDR</span>

                <div
                className="nav-buttons"
                style={{
                    display: "flex",
                    justifyContent:"space-between",
                    alignItems: "center",
                  }}>
                <Button 
                component={Link} to="/users"
                style={{
                    margin: "0 .5rem 0",
                    fontSize: "1.2rem"
                }}
                color="inherit"
                >Users</Button>
                
                <Button 
                style={{
                    margin: "0 .5rem 0",
                    fontSize: "1.2rem"
                }}
                color="inherit">Route 2</Button>

                {/* <AccountCircle 
                style={{
                    margin: "0 .5rem 0",
                    fontSize: "2rem",
                    padding:"0"
                }}/> */}
              {/* </div> */}
            </div>
          </Toolbar>
        </AppBar>
    </div>
  )
}

export default MainNavBar