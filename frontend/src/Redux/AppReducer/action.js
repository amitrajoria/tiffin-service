import axios from "axios";
import * as actions from './actionTypes'
import { getLoginData } from "../../utils/LocalStorage";

const getProfile = () => dispatch => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get('http://localhost:8080/profile', { headers })
            .then((res) => dispatch({ type: actions.USER_SUCCESS, payload: res?.data?.user}))
            .catch((err) => dispatch({ type: actions.USER_FAILURE, payload: err?.response?.data?.msg}))
}

const getVenders = () => dispatch => {
    dispatch({ type: actions.VENDER_REQUEST});
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get('http://localhost:8080/venders', { headers })
            .then((res) => dispatch({ type: actions.VENDER_SUCCESS, payload: res?.data?.venders}))
            .catch((err) => dispatch({ type: actions.VENDER_FAILURE, payload: err?.response?.data?.msg}))
}

const getPGs = () => dispatch => {
    dispatch({ type: actions.PG_REQUEST});
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get('http://localhost:8080/pg', { headers })
            .then((res) => dispatch({ type: actions.PG_SUCCESS, payload: res?.data?.pg}))
            .catch((err) => dispatch({ type: actions.PG_FAILURE, payload: err?.response?.data?.msg}))
}

const getTiffins = (venderId) => async dispatch => {
    if(!venderId)
        return ;
    console.log(" ACTION GET TIFFIN ", venderId);
    dispatch({ type: actions.TIFFIN_REQUEST});
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`http://localhost:8080/tiffins/${venderId}`, { headers })
            .then((res) => dispatch({ type: actions.TIFFIN_SUCCESS, payload: res?.data?.tiffin}))
            .catch((err) => dispatch({ type: actions.TIFFIN_FAILURE, payload: err?.response?.data?.msg}))
}

const getCart = () => async dispatch => {
    const user = await dispatch(getProfile());
    const venderId = user?.payload?.vender_id;
    console.log("ACTION GET CART VENDER ID ", venderId);
    dispatch({ type: actions.CART_REQUEST});
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get(`http://localhost:8080/cart/${venderId}`, { headers })     
            // .then((res) => console.log(res))
            // .catch((err) => console.log(err))
            .then((res) => dispatch({ type: actions.CART_SUCCESS, payload: res?.data?.cart}))
            .catch((err) => dispatch({ type: actions.CART_FAILURE, payload: err?.response?.data?.msg}))
}

const getOrders = () => dispatch => {
    dispatch({ type: actions.ORDER_REQUEST});
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get('http://localhost:8080/orders', { headers })     
            // .then((res) => console.log(res))
            // .catch((err) => console.log(err))
            .then((res) => dispatch({ type: actions.ORDER_SUCCESS, payload: res?.data?.orders}))
            .catch((err) => dispatch({ type: actions.ORDER_FAILURE, payload: err?.response?.data?.msg}))
}

const addPG = (payload) => dispatch => {
    dispatch({ type: actions.PG_REQUEST});
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios({
                    method : "POST",
                    url : `http://localhost:8080/pg/add`,
                    headers,
                    data : payload
                })
            .then((res) => dispatch(getPGs()))
            .catch((err) => dispatch({ type: actions.PG_FAILURE, payload: err?.response?.data?.msg}))
}

const addToCart = (payload) => dispatch => {
    console.log("BOOK ORDER");
    dispatch({ type: actions.CART_REQUEST });
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    console.log(payload);
    return axios({
                    method : "POST",
                    url : `http://localhost:8080/cart/add`,
                    headers,
                    data : payload
            })
            .then((res) => dispatch(getCart()))
            .catch((err) => dispatch({ type: actions.CART_FAILURE, payload: err?.response?.data?.msg}))
}

const placeOrder = (payload) => dispatch => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    console.log(payload);
    return axios({
                method : "POST",
                url : `http://localhost:8080/orders/add`,
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
                url : `http://localhost:8080/profile/update`,
                headers,
                data : payload
            })
            .then((res) => dispatch({ type: actions.USER_SUCCESS, payload: res?.data?.user}))
            .catch((err) => dispatch({ type: actions.USER_FAILURE, payload: err?.response?.data?.msg}))
}

const updateTiffinStatus = ({id, status, vender_id}) => dispatch => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    console.log(id+" "+status+" "+vender_id);
    return axios({
                method : "PATCH",
                url : `http://localhost:8080/tiffins/update`,
                headers,
                data : {id, status}
            })
            .then((res) => dispatch(getTiffins(vender_id)))
            .catch((err) => dispatch({ type: actions.TIFFIN_FAILURE, payload: err?.response?.data?.msg}))
}

const deleteCartItem = (cart_id) => dispatch => {
    const token = getLoginData('loginToken');
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete(`http://localhost:8080/cart/delete/${cart_id}`, { headers })
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
    placeOrder,
    addPG,
    updateProfile,
    updateTiffinStatus,
    addToCart,
    deleteCartItem
}