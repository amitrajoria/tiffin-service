import axios from "axios";
import * as actions from './actionTypes'
import { getLoginData } from "../../utils/LocalStorage";

const getProfile = () => dispatch => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get('https://vercel-tiffinservice-backend.vercel.app/profile', { headers })
            .then((res) => dispatch({ type: actions.USER_SUCCESS, payload: res?.data?.user}))
            .catch((err) => dispatch({ type: actions.USER_FAILURE, payload: err?.response?.data?.msg}))
}

const getVenders = () => dispatch => {
    dispatch({ type: actions.VENDER_REQUEST});
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get('https://vercel-tiffinservice-backend.vercel.app/venders', { headers })
            .then((res) => dispatch({ type: actions.VENDER_SUCCESS, payload: res?.data?.venders}))
            .catch((err) => dispatch({ type: actions.VENDER_FAILURE, payload: err?.response?.data?.msg}))
}

const getPGs = () => dispatch => {
    dispatch({ type: actions.PG_REQUEST});
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get('https://vercel-tiffinservice-backend.vercel.app/pg', { headers })
            .then((res) => dispatch({ type: actions.PG_SUCCESS, payload: res?.data?.pg}))
            .catch((err) => dispatch({ type: actions.PG_FAILURE, payload: err?.response?.data?.msg}))
}

const getTiffins = (venderId) => async dispatch => {
    if(!venderId)
        return ;
    // console.log(" ACTION GET TIFFIN ", venderId);
    dispatch({ type: actions.TIFFIN_REQUEST});
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`https://vercel-tiffinservice-backend.vercel.app/tiffins/${venderId}`, { headers })
            .then((res) => dispatch({ type: actions.TIFFIN_SUCCESS, payload: res?.data?.tiffin}))
            .catch((err) => dispatch({ type: actions.TIFFIN_FAILURE, payload: err?.response?.data?.msg}))
}

const getCart = () => async dispatch => {
    const user = await dispatch(getProfile());
    const venderId = user?.payload?.vender_id;
    // console.log("ACTION GET CART VENDER ID ", venderId);
    dispatch({ type: actions.CART_REQUEST});
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`https://vercel-tiffinservice-backend.vercel.app/cart/${venderId}`, { headers })   
            .then((res) => dispatch({ type: actions.CART_SUCCESS, payload: res?.data?.cart}))
            .catch((err) => dispatch({ type: actions.CART_FAILURE, payload: err?.response?.data?.msg}))
}

const getOrders = (params) => dispatch => {
    console.log("GET ORDERS => ",params);
    dispatch({ type: actions.ORDER_REQUEST});
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    // console.log(`https://vercel-tiffinservice-backend.vercel.app/orders?${params}`);
    return axios.get(`https://vercel-tiffinservice-backend.vercel.app/orders?${params}`, { headers })    
            .then((res) => dispatch({ type: actions.ORDER_SUCCESS, payload: res?.data?.orders}))
            .catch((err) => dispatch({ type: actions.ORDER_FAILURE, payload: err?.response?.data?.msg}))
}

const getOrdersHistory = (params) => dispatch => {
    console.log("GET ORDER HISTORY => ",params);
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`https://vercel-tiffinservice-backend.vercel.app/orders?${params}`, { headers }) 
            .then((res) => {return { type: "SUCCESS", payload: res?.data?.orders}})
            .catch((err) => {return { type: "FAILURE", payload: err?.response?.data?.msg}})
}

const getOrdersAnalytics = (params) => dispatch => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`https://vercel-tiffinservice-backend.vercel.app/orders/analytics?${params}`, { headers }) 
            .then((res) => {return { type: "SUCCESS", payload: res?.data?.analytics}})
            .catch((err) => {return { type: "FAILURE", payload: err?.response?.data?.msg}})
}

const getCustomers = () => dispatch => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get('https://vercel-tiffinservice-backend.vercel.app/customers', { headers })     
            .then((res) => {return { type: "SUCCESS", payload: res?.data?.customers}})
            .catch((err) => {return { type: "FAILURE", payload: err?.response?.data?.msg}})
}

const getPGRegistered = () => dispatch => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get('https://vercel-tiffinservice-backend.vercel.app/pg/registered', { headers })     
            .then((res) => {return { type: "SUCCESS", payload: res?.data?.pgs}})
            .catch((err) => {return { type: "FAILURE", payload: err?.response?.data?.msg}})
}

const addPG = (payload) => dispatch => {
    dispatch({ type: actions.PG_REQUEST});
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios({
                    method : "POST",
                    url : `https://vercel-tiffinservice-backend.vercel.app/pg/add`,
                    headers,
                    data : payload
                })
            .then((res) => dispatch(getPGs()))
            .catch((err) => dispatch({ type: actions.PG_FAILURE, payload: err?.response?.data?.msg}))
}

const addToCart = (payload) => dispatch => {
    // console.log("BOOK ORDER");
    dispatch({ type: actions.CART_REQUEST });
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    // console.log(payload);
    return axios({
                    method : "POST",
                    url : `https://vercel-tiffinservice-backend.vercel.app/cart/add`,
                    headers,
                    data : payload
            })
            .then((res) => dispatch(getCart()))
            .catch((err) => dispatch({ type: actions.CART_FAILURE, payload: err?.response?.data?.msg}))
}


const addTiffin = (payload, vender_id) => dispatch => {
    dispatch({ type: actions.TIFFIN_REQUEST});
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios({
                    method : "POST",
                    url : `https://vercel-tiffinservice-backend.vercel.app/tiffins/add/${vender_id}`,
                    headers,
                    data : payload
                })
            .then((res) => dispatch(getTiffins(vender_id)))
            .catch((err) => dispatch({ type: actions.TIFFIN_FAILURE, payload: err?.response?.data?.msg}))
}

const addVender = (payload) => dispatch => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios({
                    method : "POST",
                    url : `https://vercel-tiffinservice-backend.vercel.app/venders/add`,
                    headers,
                    data : payload
                })
            .then((res) => dispatch(getVenders()))
            .catch((err) => dispatch({ type: "FAILURE", payload: err?.response?.data?.msg}))
}


const placeOrder = (payload) => dispatch => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    // console.log(payload);
    return axios({
                method : "POST",
                url : `https://vercel-tiffinservice-backend.vercel.app/orders/add`,
                headers,
                data : payload
            })
            .then((res) => {return { type: 'SUCCESS', payload: res?.data?.msg}})
            .catch((err) => {return { type: 'FAILURE', payload: err?.response?.data?.msg}})
}

const updateProfile = (payload) => dispatch => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios({
                method : "PATCH",
                url : `https://vercel-tiffinservice-backend.vercel.app/profile/update`,
                headers,
                data : payload
            })
            .then((res) => dispatch({ type: actions.USER_SUCCESS, payload: res?.data?.user}))
            .catch((err) => dispatch({ type: actions.USER_FAILURE, payload: err?.response?.data?.msg}))
}

const updateTiffinStatus = ({id, status, vender_id}) => dispatch => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    // console.log(id+" "+status+" "+vender_id);
    return axios({
                method : "PATCH",
                url : `https://vercel-tiffinservice-backend.vercel.app/tiffins/update`,
                headers,
                data : {id, status}
            })
            .then((res) => dispatch(getTiffins(vender_id)))
            .catch((err) => dispatch({ type: actions.TIFFIN_FAILURE, payload: err?.response?.data?.msg}))
}

const deleteCartItem = (cart_id) => dispatch => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(`https://vercel-tiffinservice-backend.vercel.app/cart/delete/${cart_id}`, { headers })
            .then((res) => dispatch(getCart()))
            .catch((err) => dispatch({ type: actions.CART_FAILURE, payload: err?.response?.data?.msg}))
}

export {
    getProfile,
    getVenders,
    getPGs,
    getTiffins,
    getCart,
    getOrders,
    getOrdersHistory,
    getOrdersAnalytics,
    getCustomers,
    getPGRegistered,
    addTiffin,
    addVender,
    placeOrder,
    addPG,
    updateProfile,
    updateTiffinStatus,
    addToCart,
    deleteCartItem
}