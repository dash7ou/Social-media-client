import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
    likeScream,
    unLikeScream,
    getScreams,
    getScream
} from "../../actions/scream";

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FavoritIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const LikeScream = ({ screamId, scream, user, auth, getScreams,getScream, likeScream, unLikeScream })=>{
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
            await getScream(screamId, true)
            await getScreams();
        }catch(err){}
    }

    const unLikeScreamHandle = async ()=>{
        try{
            await unLikeScream(screamId);
            await getScream(screamId, true)
            await getScreams();
        }catch(err){}
    }

    useEffect(()=>{
        isLikeScream()
    }, [ scream ])

    return (
        !auth ? (
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
    )
}


const mapStateToProps = state => ({
    auth: state.user.authenticated,
    user: state.user.user
});

export default connect(mapStateToProps , {
    getScreams,
    likeScream,
    getScream,
    unLikeScream
})(LikeScream);