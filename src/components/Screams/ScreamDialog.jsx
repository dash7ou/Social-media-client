import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import LikeScream from "./LikeScream";
import Comments from "./Comments";
import AddComment from "./AddComment";

// redux
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../actions/scream";


// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";



const styles = {
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    expandButton:{
        position:"absolute",
        left: '90%'
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: "50%",
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    spinnerDiv:{
        textAlign: 'center',
        margin: "15 0"
    },
    screamInfo:{
        padding: 20,
    },
    scream:{
        padding: 20
    }
}

const ScreamDialog = ({ id, userHandle, getScream,clearErrors, scream, ui: { loading }, classes, openDialog })=>{
    const [ open, setOpen ] = useState(false);
    const [ pathes , setPathes ] = useState({
        newPath: null,
        oldPath: null
    })

    const handleOpen = async ()=>{
        let newPath = `/users/${userHandle}/scream/${id}`;
        let oldPath =  window.location.pathname;
        setPathes({
            oldPath,
            newPath
        });
        if(oldPath === newPath) oldPath = `/user/${userHandle}`
        window.history.pushState(null, null, newPath)
        setOpen(true);
        await getScream(id)
    }

    const handleClose = async ()=>{
        window.history.pushState(null, null, pathes.oldPath)
        setOpen(false);
        clearErrors()
    }

    useEffect(()=>{
        if(openDialog){
            handleOpen()
        }
    }, [])

    return (
        <Fragment>
            <Tooltip title="Expand Scream" placement="top" onClick={handleOpen} className={classes.expandButton}>
                <IconButton> 
                    <UnfoldMore color="primary" />
                </IconButton> 
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <Tooltip title="Add Screams" placement="top" onClick={handleClose}>
                    <IconButton className="button"> 
                        <CloseIcon color="primary" />
                    </IconButton> 
                </Tooltip>
                <DialogContent className={classes.dialogContent}>
                    { loading ? <div className={classes.spinnerDiv} ><CircularProgress size={200} thickness={2}/> </div>: (
                        <Grid container spacing={16} className={classes.scream}>
                            <Grid item sm={5}>
                                <img src={scream.userImage} alt="profile" className={classes.profileImage} />
                            </Grid>
                            <Grid item sm={7} className={classes.screamInfo}>
                                <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
                                    @{scream.userHandle}
                                </Typography>
                                <hr className={classes.invisibleSeparator} />
                                <Typography variant="body2" color="textSecondary" >
                                    {dayjs(scream.createdAt).format("h:mm a, MMMM DD YYYY")}
                                </Typography>
                                <hr className={classes.invisibleSeparator} />
                                <Typography variant="body1">
                                    {scream.body}
                                </Typography>
                                <LikeScream scream={scream} screamId={scream.screamId}/>
                                <span>{scream.likeCount} Likes</span>
                                <Tooltip title="Comments" placement="top">
                                    <IconButton className="button">
                                        <ChatIcon color="primary" />
                                    </IconButton>
                                </Tooltip>
                                <span>{scream.commentCount} comments</span>
                            </Grid>
                            <hr className={classes.visibleSeparator} />
                            <AddComment screamId={scream.screamId} />
                            <Comments comments={scream.comments} />
                        </Grid>
                    )}
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    scream: state.scream.scream,
    ui: state.ui,
    user: state.user.user
});

export default connect( mapStateToProps, {
    getScream,
    clearErrors
})(withStyles(styles)(ScreamDialog));