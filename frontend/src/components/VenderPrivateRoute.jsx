import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProfile } from '../Redux/AppReducer/action';

const VenderPrivateRoute = ({children}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector((store) => store.AuthReducer.isAuth);
    const user = useSelector((store) => store.AppReducer.user);
    const location = useLocation();

    useEffect(() => {
        if(!isAuth)
            navigate('/login', {replace : true});
    }, [isAuth])
    

    useEffect(() => {
      if(Object.keys(user).length === 0 && isAuth)
        dispatch(getProfile())
    }, [user])    
// console.log("VENDER PRIVATE USER ROLE ",user.role);
    return (user && user?.role === "vender") ? children : ''
    // return children;
}                            

export default VenderPrivateRoute