import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
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
	}
};

const Profile = ({ classes, user: userData }) => {
		return (<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className='image-wrapper'>
					<img src={userData.imageUrl} alt='photoProfile' className='profile-image' />
					<input type='file' id='imageInput' hidden='hidden' />
					<hr />
				</div>

				<div className='profile-details'>
					<MuiLink component={Link} to={`/users/${userData.handle}`} color='primary' variant='h5'>
						@{userData.handle}
					</MuiLink>
					<hr />
					{userData.bio && <Typography variant='body2'>{userData.bio}</Typography>}
					<hr />
					{userData.location && (
						<Fragment>
							<LocationOn color='primary' /> <span>{userData.location}</span>
							<hr />
						</Fragment>
					)}
					{userData.website && (
						<Fragment>
							<LinkIcon color='primary' />
							<a href={userData.website} target='_blank' rel='noopener noreferrer'>
								{userData.website}
							</a>
						</Fragment>
					)}
					<hr />
					<CalendarToday color='primary' />
					<span>Joined {dayjs(userData.createdAt).format('MMM YYYY')}</span>
				</div>
			</div>
		</Paper>
	);
};


export default withStyles(styles)(Profile);
