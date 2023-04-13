import * as actions from './actionTypes'

const initState = {
    cart : [],
    orders : [],
    orderLoading : false,
    cartLoading : false   
}

const OrderReducer = (state = initState, action) => {
    const {type, payload} = action;
    switch(type) {
        case actions.CART_REQUEST : 
            return {
                ...state,
                cartLoading : true,
            }
        case actions.CART_SUCCESS : 
            return {
                ...state,
                cart : payload,
                cartLoading : false
            }
        case actions.CART_FAILURE : 
            return {
                ...state,
                cart : [],
                cartLoading : false
            }
        case actions.ORDER_REQUEST : 
            return {
                ...state,
                orderLoading : true,
            }
        case actions.ORDER_SUCCESS : 
        // console.log(payload);
            return {
                ...state,
                orders : payload,
                orderLoading : false
            }
        case actions.ORDER_FAILURE : 
            return {
                ...state,
                orders : [],
                orderLoading : false
            }         
        default : 
            return state;
    }
}

export {OrderReducer};