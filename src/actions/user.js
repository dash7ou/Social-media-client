import axios from "axios";
    
import { 
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTH,
    LOADING_USER,
    SET_USER_PROFILE,
    MARK_NOTIFICATION_READ
} from "./types";

export const login = (userData, history)=> async dispatch =>{
    dispatch( {
        type: LOADING_UI,
        payload: true
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_FUNCTION_URI}/users/login`, userData);
        axios.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;
        localStorage.setItem("fbToken", `Bearer ${res.data.token}`);
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data.error
        })
        return dispatch( {
            type: LOADING_UI,
            payload: false
        });
    }
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS})
    dispatch( {
        type: LOADING_UI,
        payload: false
    });
    history.push("/")
}


export const getUserData = ()=> async dispatch =>{
    dispatch({ type: LOADING_USER })
    let res;
    try{
        res = await axios.get(`${process.env.REACT_APP_FUNCTION_URI}/users/me`);
        dispatch({
            type: SET_USER,
            payload: res.data
        })
    }catch(err){
        console.log(err)
    }
}

export const getUserPublic = handle => async dispatch=>{
    dispatch({ type: LOADING_USER })
    try{
        const res = await axios.get(`${process.env.REACT_APP_FUNCTION_URI}/users/${handle}`);
        dispatch({
            type: SET_USER_PROFILE,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: SET_USER_PROFILE,
            payload: null
        })
    }
}

export const signup = (userData, history) => async dispatch =>{
    try {
        if(userData.password !== userData.confirmPassword){
            return dispatch({
                type: SET_ERRORS,
                payload: "confirm password problem"
            })
        }
        dispatch( {
            type: LOADING_UI,
            payload: true
        });
        
        const res = await axios.post(`${process.env.REACT_APP_FUNCTION_URI}/users/signup`, userData);
        axios.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;
        localStorage.setItem("fbToken", `Bearer ${res.data.token}`);
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data.error
        })
        return dispatch( {
            type: LOADING_UI,
            payload: false
        });
    }
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS})
    dispatch( {
        type: LOADING_UI,
        payload: false
    });
    history.push("/")
}

export const logout = ()=> dispatch =>{
    localStorage.removeItem("fbToken");
    delete axios.defaults.headers['Authorization'];
    dispatch({
        type: SET_UNAUTH
    })
}

export const uploadImage = (formData)=> async dispatch =>{
    dispatch({ type: LOADING_USER});
    try{
        await axios.patch(`${process.env.REACT_APP_FUNCTION_URI}/users/uploadImage`, formData);
        dispatch(getUserData());
    }catch(err){
        console.log(err)
    }
}


export const editUserDetaild = (formData) => async dispatch =>{
    dispatch({ type: LOADING_USER });
    try{
        await axios.patch(`${process.env.REACT_APP_FUNCTION_URI}/users/me`, formData);
        dispatch(getUserData())
    }catch(err){
        console.log(err)
    }
}

export const markNotificationRead = notifications => async dispatch =>{
    try{
        dispatch({ 
            type: MARK_NOTIFICATION_READ
        });
        await axios.patch(`${process.env.REACT_APP_FUNCTION_URI}/notifications/makeRead`, {notifications});
    }catch(err){
        console.log(err);
    }
}