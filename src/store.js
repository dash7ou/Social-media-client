import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import userReducer from "./reducers/user";
import uiReducer from "./reducers/ui";
import screamReducer from "./reducers/scream";

const initialState = {};

const middleware = [ thunk ];

const reducers = combineReducers({
    user: userReducer,
    ui: uiReducer,
    scream: screamReducer
});

const store = createStore(reducers, initialState, 
    composeWithDevTools(
        applyMiddleware(
            ...middleware
        )
    )
);

export default store;