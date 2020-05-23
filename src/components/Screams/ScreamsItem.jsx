import React from "react";
import { Link } from "react-router-dom";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";

const styles = {
    card: {
        display: "flex",
        marginBottom: 20
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

const ScreamsItem = ({ classes, scream:{ userImage, userHandle, createdAt, body } })=>{
    return(
        <Card className={classes.card}>
            <CardMedia className={classes.image} image={userImage} title="profile image" />
            <CardContent className={classes.content}>
                <Typography component={Link} variant="h5" to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                <Typography variant="body2" color="textSecondary">{createdAt}</Typography>
                <Typography variant="body1">{body}</Typography>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(ScreamsItem);