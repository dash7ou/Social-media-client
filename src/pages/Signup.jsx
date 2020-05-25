import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { signup } from "../actions/user"

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
		margin: '5px auto'
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

const Signup = ({ classes: { form, pageTitle, image, textField, button }, signup, ui: {loading , errors} }) => {
	const [ formData, setFormData ] = useState({
		email: '',
        password: '',
        confirmPassword: '',
        handle: ''
	});
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
        try{
			signup(formData,history)
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
						helperText={errors &&  errors.email}
						error={errors &&  errors.email ? true : false}
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
						helperText={errors &&  errors.password}
						error={errors &&  errors.password ? true : false}
                    />
                    <TextField
                        id='confirmPassword'
                        name='confirmPassword'
                        type='password'
                        label='Confirm Password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={textField}
                        fullWidth
                        helperText={errors &&  errors.confirmPassword}
                        error={errors &&  errors.confirmPassword ? true : false}
                    />

                    <TextField
                        id='handle'
                        name='handle'
                        type='text'
                        label='Handle'
                        value={formData.handle}
                        onChange={handleChange}
                        className={textField}
                        fullWidth
                        helperText={errors &&  errors.handle}
                        error={errors &&  errors.handle ? true : false}
                    />
					<Button type='submit' variant='contained' color='primary' className={button} disabled={loading}>
						{ loading ? <CircularProgress size={30}/> : 'Signup'}
                    </Button>
                    <br/>
                    <small>Have an account ? Login <Link to="/login">here</Link></small>
				</form>
			</Grid>
			<Grid item sm />
		</Grid>
	);
};

Signup.propTypes = {
	classes: PropTypes.object.isRequired,
	signup: PropTypes.func.isRequired,
	ui: PropTypes.object.isRequired,
};

const mapStateToProps = state =>({
	ui: state.ui
})

export default connect(mapStateToProps, {
	signup
})(withStyles(styles)(Signup));
