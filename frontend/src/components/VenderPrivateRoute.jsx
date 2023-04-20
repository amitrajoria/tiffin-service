import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../Redux/AppReducer/action';

const VenderPrivateRoute = ({children}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector((store) => store.AuthReducer.isAuth);
    const user = useSelector((store) => store.AppReducer.user);

    useEffect(() => {
        if(!isAuth)
            navigate('/login', {replace : true});
    }, [isAuth])
    

    useEffect(() => {
      if(Object.keys(user).length === 0 && isAuth)
        dispatch(getProfile())
    }, [user])    

    return (user && user?.role === "vender") ? children : ''
}                            

export default VenderPrivateRoute