import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI
} from "../actions/types";

const initialSate = {
    loading: false,
    errors: null
}

export default (state = initialSate,action)=>{
    switch(action.type){
        case SET_ERRORS:
            if (action.payload.startsWith('email')) {
                return {
                    ...state,
                    errors: {
                        ...initialSate.errors,
                        email: action.payload
                    }
                }
            } else if (action.payload.startsWith('password')) {
                return {
                    ...state,
                    errors: {
                        ...initialSate.errors,
                        password: action.payload
                    }
                }
            } else {
                return {
                    ...state,
                    errors: {
                        ...initialSate.errors,
                        general: action.payload
                    }
                }
            }
        case CLEAR_ERRORS:
            return initialSate
        case LOADING_UI:
            return{
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}