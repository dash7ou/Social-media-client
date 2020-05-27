import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import DeleteScream from "./DeleteScream";

// redux
import { connect } from "react-redux";
import {
    likeScream,
    unLikeScream,
    getScreams
} from "../../actions/scream";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from "@material-ui/icons/Chat";
import FavoritIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

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

const ScreamsItem = ({ classes,getScreams, scream:{ screamId,likeCount, userImage, userHandle, createdAt, body, commentCount },auth, likeScream, unLikeScream, user })=>{
    dayjs.extend(relativeTime);
    const [ isLike, setIsLike ] = useState(false)
    
    const isLikeScream = ()=>{
        if(user && user.likes && user.likes.map(scream => scream.screamId).includes(screamId)){
            setIsLike(true)
        }else{
            setIsLike(false)
        }
    }

    const likeScreamHandle = async ()=>{
        try{
            await likeScream(screamId);
            await getScreams()
        }catch(err){}
    }

    const unLikeScreamHandle = async ()=>{
        try{
            await unLikeScream(screamId);
            await getScreams()
        }catch(err){}
    }

    useEffect(()=>{
        isLikeScream()
    }, [ user ])

    const likeButton = !auth ? (
        <Tooltip title="like" placement="top">
            <Link to="/login">
            <IconButton className="button">
                <FavoriteBorder color="primary" />
            </IconButton>
            </Link>
        </Tooltip>
    ) : ( isLike ? (
        <Tooltip title="Un like" placement="top">
            <IconButton onClick={unLikeScreamHandle} className="button">
                <FavoritIcon color="primary" />
            </IconButton>
        </Tooltip>
    ): (
        <Tooltip title="like" placement="top">
            <IconButton onClick={likeScreamHandle} className="button">
                <FavoriteBorder color="primary" />
            </IconButton>
        </Tooltip>
    ))

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
                {likeButton}
                <span>{likeCount} Likes</span>
                <Tooltip title="Comments" placement="top">
                    <IconButton className="button">
                        <ChatIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <span>{commentCount} comments</span>
                {deleteButton}
            </CardContent>
        </Card>
    )
}

const mapStateToProps = state =>({
    user: state.user.user,
    auth: state.user.authenticated
})

export default connect(mapStateToProps , {
    likeScream,
    unLikeScream,
    getScreams
})(withStyles(styles)(ScreamsItem));