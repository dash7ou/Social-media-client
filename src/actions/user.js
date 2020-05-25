import axios from "axios";
    
import { 
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTH
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
    let res;
    try{
        res = await axios.get(`${process.env.REACT_APP_FUNCTION_URI}/users/me`);
    }catch(err){
        console.log(err)
    }
    dispatch({
        type: SET_USER,
        payload: res.data
    })

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
        action: SET_UNAUTH
    })
}