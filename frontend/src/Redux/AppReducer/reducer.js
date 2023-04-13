import * as actions from './actionTypes'

const initState = {
    user : {},
    venders : [],
    pg : [],
    tiffin : [],
    pgLoading : false,
    venderLoading : false
}

const reducer = (state = initState, action) => {
    // console.log("REDUCER -- ", action);
    const {type, payload} = action;
    switch(type) {
        case actions.USER_SUCCESS : 
            return {
                ...state,
                user : payload,
                venderLoading : false,
                pgLoading : false,
            }
        case actions.USER_FAILURE : 
            return {
                ...state,
                user : {},
                venderLoading : false,
                pgLoading : false,
            }
        case actions.VENDER_REQUEST : 
            return {
                ...state,
                venders : [],
                pgLoading : false,
                venderLoading : true,
            }
        case actions.VENDER_SUCCESS : 
            return {
                ...state,
                venders : payload,
                pgLoading : false,
                venderLoading : false
            }
        case actions.VENDER_FAILURE : 
            return {
                ...state,
                venders : [],
                pgLoading : false,
                venderLoading : false
            }
        case actions.PG_REQUEST : 
            return {
                ...state,
                pg : [],
                pgLoading : true,
                venderLoading : true
            }
        case actions.PG_SUCCESS : 
            return {
                ...state,
                pg : payload,
                pgLoading : false,
                venderLoading : false
            }
        case actions.PG_FAILURE : 
            return {
                ...state,
                pg : [],
                pgLoading : false,
                venderLoading : false
            }
        case actions.TIFFIN_SUCCESS : 
            return {
                ...state,
                tiffin : payload,
                pgLoading : false,
                venderLoading : false
            }
        case actions.TIFFIN_FAILURE : 
            return {
                ...state,
                tiffin : [],
                pgLoading : false,
                venderLoading : false
            }            
        default : 
            return state;
    }
}

export {reducer};