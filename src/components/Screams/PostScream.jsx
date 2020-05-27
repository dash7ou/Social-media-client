import React, { Fragment, useState } from "react";

// redux
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../actions/scream"

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

const styles = {
    textField: {
		margin: '10px auto'
	},
	button: {
        position: "relative",
        float: "right",
        margin: "10px 0"
    },
    closeButton:{
        position: "absolute",
        left: '90%',
        top: '10%'
    },
    title: {
        textAlign: "center"
    }
}

const PostScream = ({ classes, ui: {loading, errors }, postScream, clearErrors})=>{
    const [ open, setOpen ] = useState(false);
    const [ body, setBody ] = useState("")
    const handleChange = (e)=>{
        setBody(e.target.value)
    }

    const closeHandle = ()=>{
        setOpen(false)
        clearErrors()
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await postScream({ body });
        }catch(err){
            return
        }
        closeHandle()
    }

    return (
        <Fragment>
            <Tooltip title="Add Screams" placement="top" onClick={()=> setOpen(true)}>
                <IconButton> 
                    <AddIcon color="primary" />
                </IconButton> 
            </Tooltip>
            <Dialog
                open={open}
                onClose={closeHandle}
                fullWidth
                maxWidth="sm"
            >
                <Tooltip title="Add Screams" placement="top" onClick={closeHandle}>
                    <IconButton className="button"> 
                        <CloseIcon color="primary" />
                    </IconButton> 
                </Tooltip>
                <DialogTitle className={classes.title}>Post a new scream</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField 
                            name="body"
                            type="text"
                            label="Scream!!"
                            multiline
                            rows="3"
                            placeholder="Add a new scream, your friend can see it"
                            error={errors && errors.general ? true : false}
                            helperText={errors && errors.general}
                            className={classes.textField}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Button type='submit' variant='contained' color='primary' className={classes.button} disabled={loading}>
                            { loading ? <CircularProgress size={30}/> : 'Post'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

const mapStateToProps = state =>({
    ui: state.ui
})

export default connect(mapStateToProps, {
    postScream,
    clearErrors
})(withStyles(styles)(PostScream));