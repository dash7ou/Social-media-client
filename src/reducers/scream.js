import {
    SET_SCREAMS,
    LOADING_SCREAMS,
    LIKE_SCREAMS,
    UNLIKE_SCREAMS
} from "../actions/types";

const initialState = {
    screams: null,
    scream: {},
    loading: false
}

export default (state = initialState , action)=>{
    switch(action.type){
        case LOADING_SCREAMS:
            return{
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return{
                ...state,
                screams: action.payload,
                loading: false
            }
        case LIKE_SCREAMS:
        case UNLIKE_SCREAMS:
            const index = state.screams.findIndex((scream)=> scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            return{
                ...state
            }
        default:
            return state
    }
}