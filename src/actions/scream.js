import axios from "axios";
import {
    SET_SCREAMS,
    LOADING_SCREAMS,
    LIKE_SCREAMS,
    UNLIKE_SCREAMS,
    DELETE_SCREAM
} from "./types";


export const getScreams = _ => async dispatch =>{
    dispatch({ type: LOADING_SCREAMS });
    try{
        const res = await axios.get(`${process.env.REACT_APP_FUNCTION_URI}/screams`);
        dispatch({
            type: SET_SCREAMS,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: SET_SCREAMS,
            payload: []
        })
    }
}

export const likeScream = id => async dispatch =>{
    try{
        const res = await axios.patch(`${process.env.REACT_APP_FUNCTION_URI}/screams/${id}/like`);
        dispatch({
            type: LIKE_SCREAMS,
            payload: res.data
        })
    }catch(err){
        console.log(err)
    }
}

export const unLikeScream = id => async dispatch =>{
    try{
        const res = await axios.patch(`${process.env.REACT_APP_FUNCTION_URI}/screams/${id}/unlike`);
        dispatch({
            type: UNLIKE_SCREAMS,
            payload: res.data
        })
    }catch(err){
        console.log(err)
    }
}

export const deleteScreams = id => async dispatch =>{
    try{
        const res = await axios.delete(`${process.env.REACT_APP_FUNCTION_URI}/screams/${id}`);
        dispatch({
            type: DELETE_SCREAM,
            payload: id
        })
    }catch(err){
        console.log(err)
    }
}