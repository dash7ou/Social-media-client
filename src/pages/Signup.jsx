import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from "react-router-dom";

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

const Signup = ({ classes: { form, pageTitle, image, textField, button } }) => {
	const [ formData, setFormData ] = useState({
		email: '',
        password: '',
        confirmPassword: '',
        handle: ''
	});
	const [ loading, setLoading ] = useState(false);
	const [ errors, setErrors ] = useState({
		email: '',
        password: '',
        confirmPassword: "",
        handle: ""
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
        setLoading(true);
        
        if(formData.password !== formData.confirmPassword){
            setErrors({
                email: '',
                handle: '',
                confirmPassword: "Feild Not Match",
                password: "Feild Not Match",
            });
            return setLoading(false);
        }
		try {
            setErrors({
                email: '',
                password: '',
                confirmPassword: "",
                handle: "",
                general: ""
            });
			const res = await axios.post(`${process.env.REACT_APP_FUNCTION_URI}/users/signup`, formData);
			localStorage.setItem("fbToken", `Bearer ${res.data.token}`);
		} catch (err) {
			if (err.response.data.error.startsWith('email')) {
				setErrors({
                    password: '',
                    confirmPassword: "",
                    handle: "",
					email: err.response.data.error
                });
                return setLoading(false);
                
			}else {
				setErrors({
					email: '',
                    password: '',
                    confirmPassword: "",
                    handle: "",
					general: err.response.data.error
				});
                return setLoading(false);
			}
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
                    <TextField
                        id='confirmPassword'
                        name='confirmPassword'
                        type='password'
                        label='Confirm Password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={textField}
                        fullWidth
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
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
                        helperText={errors.handle}
                        error={errors.handle ? true : false}
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
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
