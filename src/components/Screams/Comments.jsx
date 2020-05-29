import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";


// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = {
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    commentImage : {
        maxWidth: 100,
        height: 100,
        borderRadius: "50%",
        objectFit: 'cover'
    },
    commentData:{
        marginLeft: 40
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    }
}

const Comments = ({ comments, classes })=>{
    return (
        <Grid container>
            {
                comments.map((comment, index) => (
                    <Fragment key={comment.createdAt}>
                        <Grid item sm={12}>
                            <Grid container>
                                <Grid item sm={2}>
                                    <img src={comment.userImage} alt="comment" className={classes.commentImage} />
                                </Grid>
                                <Grid item sm={9}>
                                    <div className={classes.commentData}>
                                        <Typography variant="h5" component={Link} to={`/users/${comment.userHandle}`} color="primary">
                                            {comment.userHandle}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            { dayjs(comment.createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <hr className={classes.invisibleSeparator} />
                                        <Typography variant="body1">
                                            {comment.body}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {index !== comments.length - 1 &&  <hr className={classes.visibleSeparator} />}
                    </Fragment>
                ))
            }
        </Grid>
    )
}


export default withStyles(styles)(Comments);