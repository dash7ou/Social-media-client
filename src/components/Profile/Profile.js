import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

const styles = {

}

const Profile = ()=>{
    return <p> profile </p>
}

Profile.propTypes = {
    user:PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    user: state.user.user
})

export default connect( mapStateToProps )(withStyles(styles)(Profile));