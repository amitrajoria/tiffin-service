import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { OrderReducer } from "./AppReducer/OrderReducer";
import {reducer as AppReducer} from "./AppReducer/reducer";
import {reducer as AuthReducer} from "./AuthReducer/reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({AppReducer, AuthReducer, OrderReducer});

const store = legacy_createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;