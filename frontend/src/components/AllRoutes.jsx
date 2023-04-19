import { Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from '../pages/Cart'
import Home from '../pages/Home'
import Login from '../pages/Login'
import OrderHistory from '../pages/OrderHistory'
import Profile from '../pages/Profile'
import Register from '../pages/Register.'
import CustomerPrivateRoute from './CustomerPrivateRoute'
import SideBar from './SideBar'
import Providers from '../pages/Providers'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../Redux/AppReducer/action'
import VenderHome from '../pages/VenderHome'
import VenderOrderHistory from '../pages/VenderOrderHistory'
import AuthenticateRoute from './AuthenticateRoute'
import VenderPrivateRoute from './VenderPrivateRoute'
import Menu from '../pages/Menu'


const AllRoutes = () => {

  const user = useSelector((store) => store.AppReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!user)
      dispatch(getProfile())
  }, [user])   
  
  
  return (
    <>
        <Routes>
            <Route path='/' element={
              <AuthenticateRoute>
                <SideBar> 
                  {(user?.role === "customer") ? <Home /> : <VenderHome />} 
                </SideBar>
              </AuthenticateRoute>}>
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/profile' element={<AuthenticateRoute><SideBar><Profile /></SideBar></AuthenticateRoute>}></Route>
            <Route path='/menu' element={<VenderPrivateRoute><SideBar><Menu /></SideBar></VenderPrivateRoute>}></Route>
            <Route path='/cart' element={<CustomerPrivateRoute><SideBar><Cart /></SideBar></CustomerPrivateRoute>}></Route>
            <Route path='/orders' element={
              <AuthenticateRoute>
                <SideBar> 
                  {(user?.role === "customer") ? <OrderHistory /> : <VenderOrderHistory />}
                </SideBar>
              </AuthenticateRoute>}>
            </Route>
            <Route path='/tiffin-providers' element={<CustomerPrivateRoute><SideBar><Providers /></SideBar></CustomerPrivateRoute>}></Route>
            <Route path='/custom' element={<CustomerPrivateRoute />} />
        </Routes>
    </>
  )
}
// Continue with private route
export default AllRoutes