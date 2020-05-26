import React, { useState, useEffect, Fragment } from "react";
import PropTypes from 'prop-types';

// Redux
import { connect } from "react-redux";
import { editUserDetaild } from "../../actions/user"

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";


const styles = {
	paper: {
		padding: 20
	},
	profile: {
		'& .image-wrapper': {
			textAlign: 'center',
			position: 'relative',
			'& button': {
				position: 'absolute',
				top: '80%',
				left: '70%'
			}
		},
		'& .profile-image': {
			width: 200,
			height: 200,
			objectFit: 'cover',
			maxWidth: '100%',
			borderRadius: '50%'
		},
		'& .profile-details': {
			textAlign: 'center',
			'& span, svg': {
				verticalAlign: 'middle'
			},
			'& a': {
				color: '#00bcd4'
			}
		},
		'& hr': {
			border: 'none',
			margin: '0 0 10px 0'
		},
		'& svg.button': {
			'&:hover': {
				cursor: 'pointer'
			}
		}
	},
	buttons: {
		textAlign: 'center',
		'& a': {
			margin: '20px 10px'
		}
    },
    textField: {
		margin: '10px auto'
    },
    form: {
		textAlign: 'center'
    },
    button:{
        float: "right"
    }
};



const EditDetails = ({ classes, credentials , editUserDetaild})=>{
    const [ formData, setFormData ] = useState({
        bio:"",
        website: "",
        location: ""
    })
    const [ openDialog , setOpenDialog ] = useState(false);

    useEffect(()=>{
        setFormData({
            bio: credentials.bio ? credentials.bio : "",
            website: credentials.website ? credentials.website : "",
            location: credentials.location ? credentials.location : ""
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFormChange = (e)=>{
        setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await editUserDetaild(formData)
        }catch(err){}
        setOpenDialog(false)
    }
    return (
        <Fragment>
            <Tooltip title="Edit details" placement="top">
                <IconButton onClick={()=> setOpenDialog(true)} className={classes.button}>
                    <EditIcon color="primary" />
                </IconButton> 
            </Tooltip>
            <Dialog
                open={openDialog}
                onClose={()=> setOpenDialog(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Edit Your Details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            row="3"
                            placeholder="A short bio about your self"
                            className={classes.textField}
                            value={formData.bio}
                            onChange={handleFormChange}
                            fullWidth
                        />
                        <TextField
                            name="website"
                            type="text"
                            label="Website"
                            placeholder="Add your website"
                            className={classes.textField}
                            value={formData.website}
                            onChange={handleFormChange}
                            fullWidth
                        />
                        <TextField
                            name="location"
                            type="text"
                            label="location"
                            placeholder="Add your location (at least 5 characters)"
                            className={classes.textField}
                            value={formData.location}
                            onChange={handleFormChange}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

EditDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    credentials: state.user.user.credentials
})

export default connect( mapStateToProps, {
    editUserDetaild
} )(withStyles(styles)(EditDetails));