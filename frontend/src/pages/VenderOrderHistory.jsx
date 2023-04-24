import { Button, Flex, Heading, Skeleton, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersHistory } from '../Redux/AppReducer/action';


const VenderOrderHistory = () => {

  const dispatch = useDispatch();
  const tableBgColor = useColorModeValue('white', '#292b34');
  const tableBorderColor = useColorModeValue('2px solid lightgrey', '2px solid darkslategray');
  const [ordersAvailable, setOrdersAvailable] = useState(null);
  const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      if(orders.length == 0) {
        dispatch(getOrdersHistory())
        .then((res) => {
          console.log(res);
            if(res.type == "SUCCESS") {
              setOrders(res?.payload);
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
        <Flex justify={'space-between'} margin={'20px 0'}>
            <Heading as='h3' size='lg'>{ordersAvailable !== null && ((ordersAvailable) ? "Order History" : "You haven't got any order yet")}</Heading>
        </Flex>
        {
            ordersAvailable === null && 
            <Stack padding={4} spacing={1}>
                <Skeleton height='40px'>
                </Skeleton>
                <Skeleton
                    height='40px'
                    bg='green.500'
                    color='white'
                    fadeDuration={1}
                >
                </Skeleton>
                <Skeleton
                    height='40px'
                    fadeDuration={4}
                    bg='blue.500'
                    color='white'
                >
                </Skeleton>
            </Stack>
        }
        
        {
        ordersAvailable && orders?.length > 0 && 
        <TableContainer background={tableBgColor} rounded={'lg'}>
            <Table variant='simple'>
                <TableCaption>Total Orders with quantity of different types of Tiffin</TableCaption>
                <Thead>
                <Tr>
                    <Th isNumeric>#</Th>
                    <Th>Name</Th>
                    <Th>Mobile</Th>
                    <Th>Room No.</Th>
                    <Th>PG</Th>
                    <Th>Payment</Th>
                    <Th>Method</Th>
                    <Th>Tiffin</Th>
                    <Th>Price</Th>
                    <Th>Quantity</Th>
                    <Th>Type</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        ordersAvailable && orders?.length > 0 && 
                        orders.map((order, index) => {
                          let loop = 0;
                          const tiffins = order?.tiffins;
                          const rowspan = tiffins?.length;
                          const quantity = order?.tiffin_id;
                          let quantityMap = new Map();
                          quantity.map(quan => quantityMap.set(quan.tiffin_id, quan.quantity) );
                          return tiffins.map((tiffin, ind) => {
                            loop++; 
                            return <Tr key={order._id+"-"+ind} borderBottom={tableBorderColor}>
                                {(loop === 1) ? 
                                <>
                                  <Td rowSpan={rowspan}>{index+1}</Td>
                                  <Td rowSpan={rowspan}>{order?.user?.name}</Td>
                                  <Td rowSpan={rowspan}>{order?.user?.mobile}</Td>
                                  <Td rowSpan={rowspan}>{order?.user?.room_no}</Td>
                                  <Td rowSpan={rowspan}>{order?.pg?.name}</Td>
                                  <Td rowSpan={rowspan}>{order?.total}</Td>
                                  <Td rowSpan={rowspan}>{order?.payment}</Td>
                                </>
                                : "" }
                                <Td>{tiffin?.title}</Td>
                                <Td>{tiffin?.price}</Td>
                                <Td>{quantityMap.get(tiffin._id)}</Td>
                                <Td>{tiffin?.time}</Td>
                              </Tr> 
                          })
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
        }
    </>
  )
}

export default VenderOrderHistory