import { Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../Redux/AppReducer/action';

const OrderHistory = () => {

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
              setOrdersAvailable(false);
            else 
              setOrdersAvailable(true);
          }
          else 
            setOrdersAvailable(true);
      })
    }

  }, [orders.length])

  console.log(orders);

  return (
    <>
        <Heading as='h3' size='lg' margin={'10px 0'}>Order History</Heading>
    </>
  )
}

export default OrderHistory