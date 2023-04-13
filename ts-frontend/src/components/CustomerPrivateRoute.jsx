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
      if(!user && isAuth)
        dispatch(getProfile())
    }, [user])

    useEffect(() => {
        // console.log(user?.role);
        if(user && user?.role !== "customer")
            return ;
    }, [user])
    

  return (
    children
  )
}                            

export default CustomerPrivateRoute