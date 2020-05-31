import React from "react";

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import LocationOn from '@material-ui/icons/LocationOn';
import CalendarToday from '@material-ui/icons/CalendarToday';

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
            padding: 10,
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
    fullLine: {
        height: 15,
        width: '90%',
		textAlign: 'center',
        backgroundColor: 'rgba(0,0,0, 0.6)'
    },
    handle:{
        width: 60,
        height: 18,
        backgroundColor: '#ccc',
        margin: "7 auto",
        textAlign: 'center'
    }
}
const ProfileSkelenton = ({ classes })=>{
    return(
        <Paper>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src="/images/no-image.png" alt="profile" className="profile-image"/>
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle}></div>
                    <hr />
                    <div className={classes.fullLine} />
                    <div className={classes.fullLine} />
                    <hr />
                    <LocationOn color="primary" /> <span>Location</span>
                    <hr />
                    <CalendarToday color="primary" /> Joined date
                </div>
            </div>
        </Paper>
    )
}

export default withStyles(styles)(ProfileSkelenton)