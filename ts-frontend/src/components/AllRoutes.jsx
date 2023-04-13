import { Stack } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from '../pages/Cart'
import Home from '../pages/Home'
import Login from '../pages/Login'
import OrderHistory from '../pages/OrderHistory'
import Profile from '../pages/Profile'
import Register from '../pages/Register.'
import CustomerPrivateRoute from './CustomerPrivateRoute'
import SideBar from './SideBar'


const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<CustomerPrivateRoute><SideBar><Home /></SideBar></CustomerPrivateRoute>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/profile' element={<CustomerPrivateRoute><SideBar><Profile /></SideBar></CustomerPrivateRoute>}></Route>
            <Route path='/cart' element={<CustomerPrivateRoute><SideBar><Cart /></SideBar></CustomerPrivateRoute>}></Route>
            <Route path='/orders' element={<CustomerPrivateRoute><SideBar><OrderHistory /></SideBar></CustomerPrivateRoute>}></Route>
            <Route path='/custom' element={<CustomerPrivateRoute />} />
        </Routes>
    </>
  )
}
// Continue with private route
export default AllRoutes