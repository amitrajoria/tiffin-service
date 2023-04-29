import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Card, Divider, Flex, Heading, Input, Radio, RadioGroup, SimpleGrid, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OrderCard from '../components/OrderCard';
import { deleteCartItem, getCart, getProfile, placeOrder } from '../Redux/AppReducer/action';
import CartCardSkeleton from '../skeleons/CartCardsSkeleton';
import CartTotalSkeleton from '../skeleons/CartTotalSkeleton';

const Cart = () => {

    const dispatch = useDispatch();
    const cart = useSelector((store) => store.OrderReducer.cart);
    const user = useSelector((store) => store.AppReducer.user);
    const [cartEmpty, setCartEmpty] = useState(null);
    const cardBgColor = useColorModeValue('white', '#292b34');
    const cardSubTotalBgColor = useColorModeValue('white', 'gray.900');
    const inputBgColor = useColorModeValue('input-light', 'input-dark');
    const [orderQuantity, setOrderQuantity] = useState("");
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [coupon, setCoupon] = useState(0);
    const [delivery, setDelivery] = useState(0);
    const [payment, setPayment] = useState('UPI');
    const [paymentDisable, setPaymentDisable] = useState(false);
    const toast = useToast();

    // console.log("CART ", cart);
    useEffect(() => {
      setTotal(subTotal+delivery-coupon);
      // if(coupon != '8765678')
      //   setTotal((prev) => prev-coupon);
    }, [subTotal, coupon, delivery])

    useEffect(() => {
      if(!user)
        dispatch(getProfile())
    }, [user])

    useEffect(() => {
      if(cart.length == 0) {
        // console.log("USER VENDER ID ", user?.vender_id);
        dispatch(getCart())
        .then((res) => {
          // console.log(res);
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

    // console.log("subTotal ", subTotal);
    // console.log("QUAN ", orderQuantity);
    // console.log("CARTEMPTY ", cartEmpty);
    // console.log("USER ", user.vender_id);
    

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
        order : orderQuantity,
        vender_id : user.vender_id
      }
      // console.log(payload);
      // return ;
      dispatch(placeOrder(payload))
      .then((res) => {
        console.log(res);
        if(res?.type == 'SUCCESS') {
          toast({
            title: res?.payload,
            position: 'top-right',
            isClosable: true,
            status: 'success' 
          })
          dispatch(getCart())
        }
      })
      .catch((err) => {
        if(err?.type == 'FAILURE')
          alert(err?.payload);
          toast({
            title: err?.payload,
            position: 'top-right',
            isClosable: true,
            status: 'error' 
          })
      });

    }

    const deleteCart = (e, cart_id) => {
      dispatch(deleteCartItem(cart_id))
      .then((res) => {
          if(res?.type == 'CART_SUCCESS') {
            toast({
              title: "Item Removed from Cart",
              position: 'top-right',
              isClosable: true,
              status: 'success' 
            })
        }
      });
    }

    const addCoupon = (e) => {
      alert("Coupon Working");
      e.preventDefault();
    }

    // console.log("CART EMPTY ", cartEmpty);

  return (
    <>
        <Heading as='h3' size='lg' margin={'10px 0'}>Order Summary</Heading>
        { cartEmpty === true && <Heading as='h1' size='lg' margin={'auto0'}>You Tiffin Cart is Empty !</Heading>}

      
      
            <SimpleGrid columns={[1, 1, 2]}  margin={{base : '10px', md: '30px'}}>
                <Stack spacing='25px'>
                    {
                      cartEmpty === null && <CartCardSkeleton />
                    }
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
                                historyQuantity={""}
                                deleteCart={deleteCart}/>
                                </Box>
                        }) 
                    }
                </Stack>
                <Stack>
                  {
                    cartEmpty === null && <CartTotalSkeleton />
                  }
                  { !cartEmpty && 
                    <Card
                      padding={4}
                      // mt={6}
                      background={cardSubTotalBgColor}
                      borderRadius={'10px'}
                      direction={{ base: 'column', sm: 'row' }}
                      overflow='hidden'
                      variant='outline'
                      width={{ base: 'auto', sm: 'auto', md : '370px' }}
                      marginTop={{ base: 25 , sm: 25, md: 0 }}
                    >
                      <Stack width={'100%'}>
                        {/* <Heading as='h5' size='md'> Coupon Code </Heading> */}
                        <form onSubmit={(e) => addCoupon(e)}>
                          <Flex direction={'row'}>
                            <Input className={inputBgColor} placeholder={'Enter Coupon Code'} mr='20px'></Input>
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
                  }
                </Stack>
            </SimpleGrid>

  
    </>
  )
}

export default Cart