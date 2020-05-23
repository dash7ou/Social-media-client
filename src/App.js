import React from 'react';
import { BrowserRouter as Router , Route, Switch , Redirect } from "react-router-dom";

import Navbar from "./shared/components/Navbar"
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";

import './App.css';

const App = ()=>{
  return (
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
  )
}

export default App;
