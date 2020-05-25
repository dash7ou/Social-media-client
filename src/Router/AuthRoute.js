import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AuthRoute = ({ component: Component , authenticated, ...rest})=>(
    <Route 
        {...rest} 
        render={ (props) => (authenticated === true ? <Redirect to="/" /> : <Component {...props} /> ) }
    />
)

const mapSateToProps = state => ({
    authenticated: state.user.authenticated
})
export default connect(mapSateToProps)(AuthRoute);