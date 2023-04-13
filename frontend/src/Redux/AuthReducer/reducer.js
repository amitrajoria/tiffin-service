import { getLoginData, saveLoginData } from '../../utils/LocalStorage';
import * as actions from './actionTypes'

const initState = {
    isAuth : getLoginData("loginToken") ? true : false,
    isLoading:  false,
    token : getLoginData("loginToken") || "",
}

const reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch(type) {
        case actions.LOGIN_REQUEST : 
            return {
                ...state,
                isLoading : true,
                isAuth : false,
                token : ""
            }
        case actions.LOGIN_SUCCESS : 
            saveLoginData("loginToken", payload.token);
            return {
                ...state,
                isLoading : false,
                isAuth : true,
                token : payload.token
            }
        case actions.LOGIN_FAILURE : 
            return {
                ...state,
                isLoading : false,
                isAuth : false,
                token : ""
            }
        case actions.REGISTER_REQUEST : 
            return {
                ...state,
                isLoading : true,
                isAuth : false,
                token : ""
            }
        case actions.REGISTER_SUCCESS : 
            return {
                ...state,
                isLoading : false,
                isAuth : false,
                token : ""
            }
        case actions.REGISTER_FAILURE : 
            return {
                ...state,
                isLoading : false,
                isAuth : false,
                token : ""
            }
        default : 
            return state;
    }
}

export {reducer}