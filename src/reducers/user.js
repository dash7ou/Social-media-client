import { 
    SET_USER,
    SET_UNAUTH,
    SET_AUTH,
    LOADING_USER,
    LIKE_SCREAMS,
    UNLIKE_SCREAMS,
    SET_USER_PROFILE,
    MARK_NOTIFICATION_READ
} from "../actions/types";

const initialState = {
    authenticated: false,
    user: null,
    loading: false,
    userSelected: null
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
        case LIKE_SCREAMS:
            return{
                ...state,
                user:{
                    ...state.user,
                    likes:[
                        ...state.user.likes,
                        {
                            userHandle: state.credentials,
                            screamId: action.payload.screamId
                        }
                    ]
                }
            }
        case UNLIKE_SCREAMS:
            return{
                ...state,
                user:{
                    ...state.user,
                    likes: state.user.likes.filter(scream => scream.screamId !== action.payload.screamId)
                }
            }
        case SET_USER_PROFILE:
            return{
                ...state,
                userSelected: action.payload,
                loading:false
            }
        case MARK_NOTIFICATION_READ:
            return{
                ...state,
                user: {
                    ...state.user,
                    notifications: state.user.notifications.map(noti => {
                        if(noti.read) return noti;
                        noti.read = true;
                        return noti
                    })
                }
            }
        default:
            return state
    }
}