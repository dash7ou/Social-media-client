import React, { Fragment, useState } from "react";

// redux
import { connect } from "react-redux";
import { deleteScreams } from "../../actions/scream";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/DeleteOutline";

const styles ={
    deleteButton: {
        position: "absolute",
        left: '90%',
        top: "10%"
    }
}


const DeleteScream = ({ id,classes, deleteScreams })=>{
    const [ open , setOpen ] = useState(false);
    const handleDeleteScream = ()=>{
        deleteScreams(id);
        setOpen(false)
    }
    return (
        <Fragment>
            <Tooltip title="Delete Scream" placement="top" className={classes.deleteButton}>
                <IconButton onClick={()=> setOpen(true)} className="button">
                    <DeleteIcon color="secondary" />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Are you sure you want to delete this scream?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteScream} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default connect(null, {
    deleteScreams
})(withStyles(styles)(DeleteScream));