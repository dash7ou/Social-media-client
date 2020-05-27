import {
    SET_SCREAMS,
    LOADING_SCREAMS,
    LIKE_SCREAMS,
    UNLIKE_SCREAMS,
    DELETE_SCREAM,
    POST_SCREAM
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
        case DELETE_SCREAM:
            return{
                ...state,
                screams: state.screams.filter(scream => scream.screamId !== action.payload)
            }
        case POST_SCREAM:
            return{
                ...state,
                screams:[
                    {...action.payload},
                    ...state.screams
                ]

            }
        default:
            return state
    }
}