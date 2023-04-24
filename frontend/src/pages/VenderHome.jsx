import { Box, Button, Card, Center, Flex, Heading, List, ListItem, Skeleton, Spacer, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, getOrdersAnalytics } from '../Redux/AppReducer/action';

const VenderHome = () => {

    const dispatch = useDispatch();
    const tableBgColor = useColorModeValue('white', '#292b34');
    const tableBorderColor = useColorModeValue('2px solid lightgrey', '2px solid darkslategray');
    const [ordersAvailable, setOrdersAvailable] = useState(null);
    const [isAnalytics, setIsAnalytics] = useState(null);
    const [analytics, setAnalytics] = useState([]);
    const orders = useSelector((store) => store.OrderReducer.orders); 
    const [totalOrders, setTotalOrders] = useState(0);
    let count = 0;
  
    useEffect(() => {
      if(orders.length == 0) {
        dispatch(getOrders(`date=${new Date().toLocaleDateString()}`))
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


    useEffect(() => {
      if(analytics.length == 0) {
        dispatch(getOrdersAnalytics(`date=${new Date().toLocaleDateString()}`))
        .then((res) => {
          console.log(res);
            if(res.type == "SUCCESS") {
              (res?.payload !== undefined) ? setAnalytics(res?.payload) : setAnalytics([]);
              if(res?.payload?.length > 0)
                setIsAnalytics(true);
              else 
                setIsAnalytics(false);
            }
            else 
              setIsAnalytics(false);
        })
      }
      else if(analytics.length > 0)
        setIsAnalytics(true);
    }, [analytics.length])
  
  
    console.log(ordersAvailable);
    console.log(orders);
    console.log(isAnalytics);
    console.log(analytics);
    

    // useEffect(() => {
    //   if(orders) {
    //     const addedDate = orders[0]?.added;
    //     const d = new Date(addedDate);
    //     const options = {
    //       weekday: 'short',
    //       year: 'numeric',
    //       month: 'short',
    //       day: 'numeric',
    //     };

    //     const val = d.toLocaleString('en-IN', options);
    //     console.log(val);
    //     console.log("ADDED DATE ", addedDate);
    //   }
    // }, [orders])

  return (
    <>            
      <Heading as='h3' size='lg' margin={'20px 0'}>{ordersAvailable !== null && ((ordersAvailable) ? "Order's Analytics" : "You haven't got any order today")}</Heading>
      {
            (ordersAvailable === null || isAnalytics === null) && 
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
      {/* <Card> */}
      {isAnalytics && analytics.length > 0 && <Box bg={tableBgColor} my={8}>
          <Flex>
          <Spacer />
          <Box p='4' minWidth={'30%'}>
            <List>
            {isAnalytics && analytics.length > 0 && <ListItem marginBottom={4}><Heading as='h4' size='md'>PGs</Heading></ListItem>}
            {
              isAnalytics && analytics.length > 0 && 
              analytics.map((analytic, index) => {
                return <ListItem key={index+"="+analytic._id}>{analytic._id}</ListItem>
              })
            }
            </List>
          </Box>
          <Box p='4'>
            <List>
            {isAnalytics && analytics.length > 0 && <ListItem marginBottom={4}><Heading as='h4' size='md' visibility={'hidden'}>""</Heading></ListItem>}
            {
              isAnalytics && analytics.length > 0 &&
              analytics.map((analytic, index) => {
                return <ListItem key={index+"="+analytic._id+"="+analytic.count}>-</ListItem>;
              })
            }
            </List>
          </Box>
          <Box p='4' minWidth={'30%'}>
          <List textAlign={'center'}>
            {isAnalytics && analytics.length > 0 && <ListItem marginBottom={4}><Heading as='h4' size='md'>Total Orders</Heading></ListItem>}
            {
              isAnalytics && analytics.length > 0 &&
              analytics.map((analytic, index) => {
                count += analytic.count;
                return <ListItem key={index+"-"+analytic.count}>{analytic.count}</ListItem>
              })
            }
            </List>
          </Box>
          <Spacer />
          </Flex>
          
          {isAnalytics && analytics.length > 0 && <Text textAlign={"center"} fontSize='larger' fontWeight={'bold'} py={4}>{count} Order from {analytics.length} PGs</Text>}
          
        </Box>
        }
      {/* </Card>   */}
        {
        ordersAvailable && orders?.length > 0 && 
        <TableContainer background={tableBgColor} rounded={'lg'}>
            <Table variant='simple'>
                <TableCaption>Today's orders with quantity of different types of Tiffin</TableCaption>
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

export default VenderHome 