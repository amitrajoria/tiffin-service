import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthenticateRoute = ({ children }) => {
    const navigate = useNavigate();
    const isAuth = useSelector((store) => store.AuthReducer.isAuth);

    // console.log(user);
    useEffect(() => {
        if(!isAuth)
            navigate('/login', {replace : true});
    }, [isAuth])

  return ( children )
}

export default AuthenticateRoute