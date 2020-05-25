import axios from "axios";
    
import { 
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI
} from "./types";

export const login = (userData, history)=> async dispatch =>{
    // setLoading(true);
    dispatch( {
        type: LOADING_UI
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_FUNCTION_URI}/users/login`, userData);
        axios.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;
        localStorage.setItem("fbToken", `Bearer ${res.data.token}`);
    } catch (err) {
        return dispatch({
            type: SET_ERRORS,
            payload: err.response.data.error
        })
        // return setLoading(false);
    }
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS})
    // setLoading(false);
    dispatch( {
        type: LOADING_UI
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



///
// if (err.response.data.error.startsWith('email')) {
//     setErrors({
//         ...errors,
//         email: err.response.data.error
//     });
// } else if (err.response.data.error.startsWith('password')) {
//     setErrors({
//         ...errors,
//         password: err.response.data.error
//     });
// } else {
//     setErrors({
//         email: '',
//         password: '',
//         general: err.response.data.error
//     });
// }