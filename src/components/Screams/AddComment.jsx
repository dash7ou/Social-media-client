import React, { useState } from "react";

// Redux
import { connect } from "react-redux";
import { addNewComment } from "../../actions/scream"

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const styles={
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    textField: {
		margin: '10px auto'
	},
	button: {
        position: "relative",
        float: "right",
        margin: "10px 0"
    }
}

const AddComment = ({ screamId,addNewComment, auth,ui: { errors }, classes })=>{
    const [body ,setBody ] = useState("");

    const handleChange = (e)=>{
        setBody(e.target.value)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("here")
        try{
            await addNewComment(screamId, {body})
            setBody("")
        }catch(err){}
    }

    return auth? (
        <Grid item sm={12} style={{ textAlign: "center"}}>
            <form onSubmit={handleSubmit}>
                <TextField 
                    name="body"
                    type="text"
                    label="Comment on scream"
                    error={errors && errors.general ? true: false}
                    value={body}
                    onChange={handleChange}
                    fullWidth
                    className={classes.textField}
                    helperText={errors && errors.general}
                />
                <Button type="submit" variant="contained" color="primary" className={classes.button}>Submit</Button>
            </form>
            <hr className={classes.visibleSeparator} />
        </Grid>
    ): null
}

const mapStateToProps = state =>({
    auth: state.user.authenticated,
    ui: state.ui
})

export default connect(mapStateToProps, {
    addNewComment
})(withStyles(styles)(AddComment));