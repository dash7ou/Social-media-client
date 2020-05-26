import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// redux
import { connect } from 'react-redux';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import IconButton from '@material-ui/core/IconButton';
import EditButton from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

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

const Profile = ({ classes, user: { user: userData, loading, authenticated } }) => {
	const handleImageChange = (event) => {
		const image = event.target.files[0];
	};
	const handleEditImage = () => {
		const fileInput = document.getElementById('imageInput');
		fileInput.click();
	};

	return !loading ? authenticated ? (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className='image-wrapper'>
					<img src={userData.credentials.imageUrl} alt='photoProfile' className='profile-image' />
					<input type='file' id='imageInput' onChange={handleImageChange} hidden='hidden' />
					<Tooltip title='Edit profile picture' placement='top'>
						<IconButton onClick={handleEditImage} className='button'>
							<EditButton color='primary' />
						</IconButton>
					</Tooltip>
					<hr />
				</div>

				<div className='profile-details'>
					<MuiLink component={Link} to={`/users/${userData.credentials.handle}`} color='primary' variant='h5'>
						@{userData.credentials.handle}
					</MuiLink>
					<hr />
					{userData.credentials.bio && <Typography variant='body2'>{userData.credentials.bio}</Typography>}
					<hr />
					{userData.credentials.location && (
						<Fragment>
							<LocationOn color='primary' /> <span>{userData.credentials.location}</span>
							<hr />
						</Fragment>
					)}
					{userData.credentials.website && (
						<Fragment>
							<LinkIcon color='primary' />
							<a href={userData.credentials.website} target='_blank' rel='noopener noreferrer'>
								{userData.credentials.website}
							</a>
						</Fragment>
					)}
					<hr />
					<CalendarToday color='primary' />
					<span>Joined {dayjs(userData.credentials.createdAt).format('MMM YYYY')}</span>
				</div>
			</div>
		</Paper>
	) : (
		<Paper className={classes.paper}>
			<Typography variant='body2' align='center'>
				No profile found, Please login again
			</Typography>
			<div className={classes.buttons}>
				<Button variant='contained' color='primary' component={Link} to='/login'>
					{' '}
					Login{' '}
				</Button>
				<Button variant='contained' color='secondary' component={Link} to='/signup'>
					{' '}
					signup{' '}
				</Button>
			</div>
		</Paper>
	) : (
		<p>Loading...</p>
	);
};

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
