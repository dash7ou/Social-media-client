import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// redux
import { connect } from "react-redux";
import { getScream } from "../../actions/scream";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


const styles = {
    invisibleSeparator: {
        border: 'none',
        margin: 4
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
    }
}

const ScreamDialog = ({ id, userHandle, getScream, scream, ui: { loading }, classes })=>{
    const [ open, setOpen ] = useState(false);

    const handleOpen = async ()=>{
        setOpen(true);
        await getScream(id)
    }

    const handleClose = async ()=>{
        setOpen(false)
    }

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
                        <Grid container spacing={16}>
                            <Grid item sm={5}>
                                <img src={scream.userImage} alt="profile" className={classes.profileImage} />
                            </Grid>
                            <Grid item sm={7}>
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
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    scream: state.scream.scream,
    ui: state.ui
});

export default connect( mapStateToProps, {
    getScream
})(withStyles(styles)(ScreamDialog));