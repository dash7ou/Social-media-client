import React, { Fragment } from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";

import PostScream from "../../components/Screams/PostScream";
import Notifications from "../../components/Notification/Notifications"; 

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import NotificationIcon from "@material-ui/icons/Notifications";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


const Navbar = ({ auth, loading })=>{    
    return (
        <AppBar>
            <Toolbar className="nav-container">
            { !loading && <Fragment> 
                { auth && <PostScream /> } 
                {!auth && <Button color="inherit" component={ Link } to="/signup">SignUp</Button>}
                <Link to="/">
                    <Tooltip title="Home" placement="top">
                        <IconButton className="button">
                            <HomeIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                </Link>
                { auth && <Notifications />
                }
                {!auth && <Button color="inherit" component={ Link } to="/login">Login</Button>}
                </Fragment>
            } 
            </Toolbar>
        </AppBar>
    )
} 

const mapStateToProps = state =>({
    auth: state.user.authenticated,
    loading: state.user.loading
})
export default connect(mapStateToProps)(Navbar);