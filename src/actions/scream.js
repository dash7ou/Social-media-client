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
    CLEAR_ERRORS,
    SET_SCREAM
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

export const getScream = id => async dispatch =>{
    dispatch({
        type: LOADING_UI,
        payload: true
    })
    try{
        const res = await axios.get(`${process.env.REACT_APP_FUNCTION_URI}/screams/${id}`);
        dispatch({
            type: SET_SCREAM,
            payload: res.data
        });
        dispatch({ 
            type: LOADING_UI,
            payload: false
        })
    }catch(err){
        console.log(err)
    }
}

export const postScream = data => async dispatch =>{
    dispatch({ type: LOADING_UI });
    try{
        if(!data.body){
            throw new Error("Body must not be empty");
        }
        const res = await axios.post(`${process.env.REACT_APP_FUNCTION_URI}/screams`, data);
        dispatch({
            type: POST_SCREAM,
            payload: res.data
        })
        dispatch({ type: CLEAR_ERRORS })
    }catch(err){
        dispatch({
           type: SET_ERRORS,
           payload: err.response ? err.response.data.error : err.message
        });
        throw new Error("Body must not be empty");
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

export const clearErrors = _ => dispatch =>{
    dispatch({ type: CLEAR_ERRORS })
}