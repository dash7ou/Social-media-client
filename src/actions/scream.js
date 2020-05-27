import axios from "axios";
import {
    SET_SCREAMS,
    LOADING_SCREAMS,
    LIKE_SCREAMS,
    UNLIKE_SCREAMS,
    DELETE_SCREAM,
    LOADING_UI,
    POST_SCREAM,
    SET_ERRORS,
    CLEAR_ERRORS
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

export const postScream = data => async dispatch =>{
    dispatch({ type: LOADING_UI });
    try{
        const res = await axios.post('/screams', data);
        dispatch({
            type: POST_SCREAM,
            payload: res.data
        })
        dispatch({ type: CLEAR_ERRORS })
    }catch(err){
        dispatch({
           type: SET_ERRORS,
           payload: err.response.data.error
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