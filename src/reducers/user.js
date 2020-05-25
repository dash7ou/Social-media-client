import { 
    SET_USER,
    SET_UNAUTH,
    SET_AUTH,
    LOADING_USER
} from "../actions/types";

const initialState = {
    authenticated: false,
    user: null,
    loading: false
}


export default (state = initialState, action)=>{
    switch(action.type){
        case SET_AUTH:
            return{
                ...state,
                loading: false,
                authenticated: true
            }
        case SET_UNAUTH:
            return initialState
        case SET_USER:
            return{
                ...state,
                authenticated: true,
                loading: false,
                user: action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}