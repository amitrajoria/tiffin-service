import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../Redux/AppReducer/action';

const CustomerPrivateRoute = ({children}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector((store) => store.AuthReducer.isAuth);
    const user = useSelector((store) => store.AppReducer.user);

    // console.log(user);
    if(!isAuth)
        navigate('/login', {replace : true});

    useEffect(() => {
      if(Object.keys(user).length === 0 && isAuth)
        dispatch(getProfile())
    }, [user])
    
 
  return (user && user?.role === "customer") ? children : ''
}                            

export default CustomerPrivateRoute