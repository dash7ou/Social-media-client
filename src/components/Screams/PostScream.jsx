import React from "react";

// redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/DeleteOutline";

const styles = {
    
}

const PostScream = ()=>{
    return (
        <p>pp</p>
    )
}


export default connect()(withStyles()(PostScream));