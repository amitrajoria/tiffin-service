import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Card, Divider, Flex, Heading, Input, Radio, RadioGroup, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OrderCard from '../components/OrderCard';
import { deleteCartItem, getCart, placeOrder } from '../Redux/AppReducer/action';

const Cart = () => {

    const dispatch = useDispatch();
    const cart = useSelector((store) => store.OrderReducer.cart);
    const [cartEmpty, setCartEmpty] = useState("");
    const cardBgColor = useColorModeValue('white', 'gray.900');
    // const [bookedId, setBookedId] = useState([]);
    const [orderQuantity, setOrderQuantity] = useState("");
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [coupon, setCoupon] = useState(0);
    const [delivery, setDelivery] = useState(0);
    const [payment, setPayment] = useState('UPI');
    const [paymentDisable, setPaymentDisable] = useState(false);

    console.log("CART ", cart);

    useEffect(() => {
      setTotal(subTotal+delivery-coupon);
      // if(coupon != '8765678')
      //   setTotal((prev) => prev-coupon);
    }, [subTotal, coupon, delivery])


    useEffect(() => {
      if(cart.length == 0) {
        dispatch(getCart())
        .then((res) => {
          console.log(res);
            if(res.type == "CART_SUCCESS") {
              if(res?.payload?.length > 0)
                setCartEmpty(false);
              else 
                setCartEmpty(true);
            }
            else 
              setCartEmpty(true);
        })
      }
      
      let quantityObj = {};
      if(cart.length != 0) {
        setCartEmpty(false);
        let curTotal = 0;
        cart.map((item) => {
          curTotal += Number(item?.tiffin[0]?.price);
          Object.assign(quantityObj, { [item.tiffin_id]: 1 });          
        });
        setSubTotal(curTotal);
      }
      setOrderQuantity({...quantityObj})

    }, [cart.length])

    console.log("subTotal ", subTotal);
    console.log("QUAN ", orderQuantity);
    console.log("CARTEMPTY ", cartEmpty);
    

    const setQuantity = (curQuantity, tiffin_id, price) => {
      if(curQuantity < 1)
        return ;
      // Object.assign(orderQuantity, { [tiffin_id]: curQuantity });
      if(orderQuantity[tiffin_id] < curQuantity) {
        setSubTotal((prev) => prev+Number(price));
      }
      else if(orderQuantity[tiffin_id] > curQuantity) {
        setSubTotal((prev) => prev-Number(price));
      }
      
      setOrderQuantity({...orderQuantity, [tiffin_id]: curQuantity});

    }

    const bookOrder = () => {
      setPaymentDisable(true);
      const payload = {
        total, payment, delivery, 
        coupon , 
        order : orderQuantity
      }
      // console.log(payload);
      // return ;
      dispatch(placeOrder(payload))
      .then((res) => {
        console.log(res);
        if(res?.type == 'SUCCESS') {
          alert(res?.payload);
          dispatch(getCart())
        }
      })
      .catch((err) => {
        if(err?.type == 'FAILURE')
          alert(err?.payload);
      });

    }

    const deleteCart = (e, cart_id) => {
      dispatch(deleteCartItem(cart_id))
      .then((res) => {
          if(res?.type == 'CART_SUCCESS') {
          alert("Item Removed from Cart");
        }
      });
    }

    const addCoupon = (e) => {
      alert("Coupon Working");
      e.preventDefault();
    }

  return (
    <>
        <Heading as='h3' size='lg' margin={'10px 0'}>Order Summary</Heading>
        { cartEmpty === true && <Heading as='h1' size='lg' margin={'auto0'}>You Tiffin Cart is Empty !</Heading>}
        { cartEmpty === false && 
        // <Card
        //     padding={4}
        //     mt={6}
        //     borderRadius={'10px'}
        //     direction={{ base: 'column', sm: 'row' }}
        //     overflow='hidden'
        //     variant='outline'
        //     width='100%'
        //   >
            <SimpleGrid columns={[1, 1, 2]}  margin={{base : '10px', md: '30px'}}>
                <Stack spacing='25px'>
                    { 
                    cart.length > 0 && 
                        cart.map((cartItem) => {
                            return <Box key={cartItem._id}>
                                <OrderCard 
                                tiffin={cartItem.tiffin[0]} 
                                vender_id={""} 
                                cart={cartItem} 
                                setQuantity={setQuantity} 
                                quantity={orderQuantity[cartItem.tiffin[0]._id]} 
                                deleteCart={deleteCart}/>
                                </Box>
                        }) 
                    }
                </Stack>
                <Stack>
                  <Card
                    padding={4}
                    // mt={6}
                    borderRadius={'10px'}
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    width='370px'
                  >
                    <Stack width={'100%'}>
                      {/* <Heading as='h5' size='md'> Coupon Code </Heading> */}
                      <form onSubmit={(e) => addCoupon(e)}>
                        <Flex direction={'row'}>
                          <Input placeholder={'Enter Coupon Code'} mr='20px'></Input>
                          <Button onClick={(e) => addCoupon(e)}>ADD</Button>
                        </Flex>
                        <Text visibility={'hidden'}>Coupon msg</Text>
                      </form>
                      <Flex justifyContent={'space-between'}>
                        <Text>SubTotal : </Text>
                        <Text>{subTotal}</Text>
                      </Flex>
                      {/* <Flex justifyContent={'space-between'}>
                        <Text>Taxes : </Text>
                        <Text>00.0</Text>
                      </Flex> */}
                      <Flex justifyContent={'space-between'}>
                        <Text>Delivery Fee : </Text>
                        <Text>Free</Text>
                      </Flex>
                      <Flex justifyContent={'space-between'}>
                        <Text>Coupon Applied : </Text>
                        <Text>{coupon}</Text>
                      </Flex>
                      <Divider />
                      <Flex justifyContent={'space-between'} fontWeight='bold'>
                        <Text>Total : </Text>
                        <Text>{total} ₹</Text>
                      </Flex>
                      
                      <Divider paddingTop={'10px'} paddingBottom={'10px'} />
                      <Flex>
                        <Text fontSize='lg' fontWeight={'bold'}>Payment</Text>
                      </Flex>
                      <Flex justifyContent={'space-between'}>
                        <Text>Amount to be Paid : </Text>
                        <Text>{total} ₹</Text>
                      </Flex>
                      <Divider paddingTop={'10px'} paddingBottom={'10px'} />
                      <Flex justifyContent={'space-between'} fontWeight='bold' mt={'5px'}>
                        <Text>Payment Options : </Text>
                      </Flex>
                      <RadioGroup defaultValue={payment} marginBottom={'15px!important'} onChange={(value) => setPayment(value)}>
                        <Stack>
                          <Radio value='UPI'>U.P.I.</Radio>
                          <Radio value='COD'>Cash on Delivery</Radio>
                        </Stack>
                      </RadioGroup>
                      <Button rightIcon={<ArrowForwardIcon />} isDisabled={paymentDisable} colorScheme='blue' variant='solid' onClick={(e) => bookOrder(e)}>
                        Proceed to Pay
                      </Button>
                    </Stack>
                  </Card>
                </Stack>
            </SimpleGrid>
        //   </Card>
  
        }
    </>
  )
}

export default Cart