import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from "react-router-dom";

//redux
import { connect } from "react-redux"
import { login } from "../actions/user"

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from "@material-ui/lab/Alert";
import CircularProgress from '@material-ui/core/CircularProgress';


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
		marginTop: 10
	}
};

const Login = ({ classes: { form, pageTitle, image, textField, button }, user, login, ui: {errors, loading} }) => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});
	const history = useHistory()

	const handleSubmit = async (e) => {
		e.preventDefault();
		try{
			await login( formData , history);
		}catch(err){}
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};


	return (
		<Grid container className={form}>
			<Grid item sm />
            <Grid item sm>
				<img src='/images/app-icon.png' alt='monkeyPhoto' className={image} />
				<Typography variant='h2' className={pageTitle}>
					{' '}
					Login{' '}
                </Typography>
                {errors && errors.general && <Alert severity="error">{errors.general}</Alert>}
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
						helperText={errors && errors.email}
						error={ errors && errors.email ? true : false}
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
						helperText={ errors && errors.password}
						error={errors && errors.password ? true : false}
					/>
					<Button type='submit' variant='contained' color='primary' className={button} disabled={loading}>
						{ loading ? <CircularProgress size={30}/> : 'Login'}
                    </Button>
                    <br/>
                    <small>Don't have an account ? sign up <Link to="/signup">here</Link></small>
				</form>
			</Grid>
			<Grid item sm />
		</Grid>
	);
};

Login.propTypes = {
	classes: PropTypes.object.isRequired,
	login: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	ui: PropTypes.object.isRequired,
};

const mapStateToProps = state =>({
	user: state.user,
	ui: state.ui
})

export default connect(mapStateToProps, {
	login
})(withStyles(styles)(Login));
