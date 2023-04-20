import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../Redux/AppReducer/action';


const VenderOrderHistory = () => {

  const dispatch = useDispatch();
  const [ordersAvailable, setOrdersAvailable] = useState("");
  const orders = useSelector((store) => store.OrderReducer.orders); 
  
    useEffect(() => {
      if(orders.length == 0) {
        dispatch(getOrders())
        .then((res) => {
          console.log(res);
            if(res.type == "ORDER_SUCCESS") {
              if(res?.payload?.length > 0)
                setOrdersAvailable(true);
              else 
                setOrdersAvailable(false);
            }
            else 
              setOrdersAvailable(false);
        })
      }
      else if(orders.length > 0)
        setOrdersAvailable(true);
      
  
    }, [orders.length])
  
  
    console.log(orders);
    console.log(ordersAvailable);

  return (
    <div></div>
  )
}

export default VenderOrderHistory