import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from "@material-ui/lab/Alert";

const styles = {
	form: {
		textAlign: 'center'
	},
	image: {
		margin: '20px auto'
	},
	pageTitle: {
		margin: '10px auto'
	},
	textField: {
		margin: '10px auto'
	},
	button: {
		marginTop: 20
	}
};

const Login = ({ classes: { form, pageTitle, image, textField, button } }) => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});
	const [ loading, setLoading ] = useState(false);
	const [ errors, setErrors ] = useState({
		email: '',
		password: ''
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post(`${process.env.REACT_APP_FUNCTION_URI}/users/login`, formData);
		} catch (err) {
			if (err.response.data.error.startsWith('email')) {
				setErrors({
					...errors,
					email: err.response.data.error
				});
			} else if (err.response.data.error.startsWith('password')) {
				setErrors({
					...errors,
					password: err.response.data.error
				});
			} else {
				setErrors({
					email: '',
					password: '',
					general: err.response.data.error
				});
			}
			return setLoading(false);
		}
		setLoading(false);
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	console.log(errors);

	return (
		<Grid container className={form}>
			<Grid item sm />
            <Grid item sm>
				<img src='/images/app-icon.png' alt='monkeyPhoto' className={image} />
				<Typography variant='h2' className={pageTitle}>
					{' '}
					Login{' '}
                </Typography>
                {errors.general && <Alert severity="error">{errors.general}</Alert>}
				<form noValidate onSubmit={handleSubmit}>
					<TextField
						id='email'
						name='email'
						type='email'
						label='Email'
						value={formData.email}
						onChange={handleChange}
						className={textField}
						fullWidth
						helperText={errors.email}
						error={errors.email ? true : false}
					/>
					<TextField
						id='password'
						name='password'
						type='password'
						label='Password'
						value={formData.password}
						onChange={handleChange}
						className={textField}
						fullWidth
						helperText={errors.password}
						error={errors.password ? true : false}
					/>
					<Button type='submit' variant='contained' color='primary' className={button}>
						Login
					</Button>
				</form>
			</Grid>
			<Grid item sm />
		</Grid>
	);
};

Login.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
