import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router , Route, Switch , Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

// redux
import { Provider } from "react-redux"
import store from "./store";

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import Navbar from "./shared/components/Navbar"
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthRoute from "./Router/AuthRoute";

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
  const [ authenticated , setAuth ] = useState(false)
  useEffect(()=>{
    const token = localStorage.fbToken;
    if(token){
      const decodedToken = jwtDecode(token);
      if(decodedToken.exp *1000 < Date.now()){
        window.location.href= "/login";
        setAuth(false)
      }else{
        setAuth(true)
      }
    }
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
    <Provider store={store}>
        <Router>
          <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/signup" component={Signup} authenticated={authenticated}/>
                <AuthRoute exact path="/login" component={Login} authenticated={authenticated}/>
                <Redirect to="/"/>
              </Switch>
            </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App;
