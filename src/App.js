import React from 'react';
import { BrowserRouter as Router , Route, Switch , Redirect } from "react-router-dom";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import Navbar from "./shared/components/Navbar"
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary:{
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a0",
      contrastText: "#fff"
    }
  }
});


const App = ()=>{
  return (
    <MuiThemeProvider theme={theme}>
      <div className="app">
        <Router>
          <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Redirect to="/"/>
              </Switch>
            </div>
        </Router>
      </div>
    </MuiThemeProvider>
  )
}

export default App;
