import { Card, Flex, Heading, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../Redux/AppReducer/action';
import OrderCard from '../components/OrderCard';
import moment from 'moment/moment';
import { TimeIcon } from '@chakra-ui/icons';
import { MdOutlineLocationOn } from "react-icons/md";

const OrderHistory = () => {

  const dispatch = useDispatch();
  const [ordersAvailable, setOrdersAvailable] = useState("");
  const orders = useSelector((store) => store.OrderReducer.orders); 
  const cardBorderColor = useColorModeValue('antiquewhite', 'gray.700');

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
    <>
      <Heading as='h3' size='lg' margin={'10px 0'}>{ordersAvailable ? "Order History" : "You haven't ordered anything yet"}</Heading>
      <SimpleGrid columns={[1, 2, 2]} spacing='40px' mt={'30px'}>
      {
        ordersAvailable === true && orders.length > 0 && 
        orders.map((order) => {
          return <Card key={order._id} padding='4' bg={'unset'} border='1px solid' borderColor={cardBorderColor} width={'fit-content'}>
            <Stack>
              <Text><TimeIcon mt={'-3px'} mr='4px' />{moment(order.createdAt).utc().format("dddd, MMMM Do YYYY, h:mm:ss a")}</Text>
              <Text display={'flex'}><MdOutlineLocationOn  style={{margin:'4px 1px 0 0', fontSize:'larger'}}/>{order?.vender?.name}</Text>
              <Flex direction={'row'} justifyContent={'space-between'} mx='2px'>
                <Text display={'flex'}>Total : {order.total} ₹
                  {/* <Text fontWeight={'bold'} ml='4px'> ₹</Text> */}
                </Text>
                <Text>Payment : {order.payment}</Text>
              </Flex>
              {
                order.tiffin_id.map((tiffin_id, index) => {
                  return <OrderCard key={tiffin_id._id} 
                          tiffin={order.tiffins[index]} 
                          vender_id={""} 
                          cart={""} 
                          setQuantity={() =>{}} 
                          quantity={1} 
                          historyQuantity={tiffin_id.quantity}
                          deleteCart={() =>{}}/>
                })
              }
            </Stack>
          </Card>
        })
      }
      </SimpleGrid>
    </>
  )
}

export default OrderHistory