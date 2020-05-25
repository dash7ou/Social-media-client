import { 
    SET_USER,
    SET_UNAUTH,
    SET_AUTH
} from "../actions/types";

const initialState = {
    authenticated: false,
    user: null
}


export default (state = initialState, action)=>{
    switch(action.type){
        case SET_AUTH:
            return{
                ...state,
                authenticated: true
            }
        case SET_UNAUTH:
            return initialState
        case SET_USER:
            return{
                ...state,
                authenticated: true,
                user: action.payload
            }
        default:
            return state
    }
}