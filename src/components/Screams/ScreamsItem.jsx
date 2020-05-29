import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeScream from "./LikeScream";


// redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from "@material-ui/icons/Chat";

const styles = {
    card: {
        position: "relative",
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

const ScreamsItem = ({ classes,scream, scream:{ screamId,likeCount, userImage, userHandle, createdAt, body, commentCount },auth, user })=>{
    dayjs.extend(relativeTime);

    const deleteButton = auth && userHandle === user.credentials.handle && (
        <DeleteScream id={screamId}/>
    );

    return(
        <Card className={classes.card}>
            <CardMedia className={classes.image} image={userImage} title="profile image" />
            <CardContent className={classes.content}>
                <Typography component={Link} variant="h5" to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{body}</Typography>
                <LikeScream screamId={screamId} scream={scream}/>
                <span>{likeCount} Likes</span>
                <Tooltip title="Comments" placement="top">
                    <IconButton className="button">
                        <ChatIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <span>{commentCount} comments</span>
                {deleteButton}
                <ScreamDialog id={screamId} userHandle={userHandle} />
            </CardContent>
        </Card>
    )
}

const mapStateToProps = state =>({
    user: state.user.user,
    auth: state.user.authenticated
})

export default connect(mapStateToProps)(withStyles(styles)(ScreamsItem));