import { AddIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import { Badge, Button, Card, CardBody, CardFooter, Flex, Heading, HStack, IconButton, Image, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bookOrder, deleteCartItem, getCart } from '../Redux/AppReducer/action';

const OrderCard = ({ tiffin, vender_id, cart, setQuantity, quantity, deleteCart }) => {

    const cardBgColor = useColorModeValue('white', 'gray.900');
    const dispatch = useDispatch();
    // const cart = useSelector((store) => store.OrderReducer.cart);
    const [bookedId, setBookedId] = useState([]);
    const [itemQuantity, setItemQuantity] = useState(1);
    


  useEffect(() => {
    if(quantity >= 1)
      setItemQuantity(quantity);
    return () => {

    }
  }, [quantity])

    // useEffect(() => {
    //   if(cart.length == 0)
    //     dispatch(getCart())
      
    //   if(cart.length != 0) {
    //     const temp = cart
    //                   .map((item) => item.tiffin_id);
    //     setBookedId(temp);
    //   }

    // }, [cart.length])

    useEffect(() => {
      if(itemQuantity >= 1)
        setQuantity(itemQuantity, tiffin._id, tiffin.price);
    }, [itemQuantity])

    // const book = (id, price) => {
    //   if(bookedId.includes(id))
    //     alert("Already Booked");
        
    //     const payload = {
    //         tiffin_id : id, 
    //         vender_id,
    //         quantity : 1,
    //         price,
    //         payment : ""
    //     }
    //     dispatch(bookOrder(payload))
    //     .then((res) => {
    //         if(res?.type == "ORDER_SUCCESS")
    //             console.log("Order Placed");
    //     })
    //     .catch((err) => console.log(err))
    // }

    const ignoreChange = () => {

    }

  return (
    <Card
          bg={cardBgColor}
          padding={2}
          borderRadius={'10px'}
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          width={'370px'}
        >
          <Image
            objectFit='cover'
            // maxW={{ base: '100%', sm: '200px' }}
            borderRadius={'10px'}
            width={'100px'}
            height={'100px'}
            src={ tiffin.image || 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'}
            alt='Caffe Latte'
          />
          
          <Stack width={'100%'}>
            <CardBody padding={'0 10px'}>
              <Flex direction={'row'} justifyContent='space-between'>
                <Text fontSize='lg' fontWeight={'bold'}>{tiffin.title}</Text>
                <DeleteIcon margin={'5px -3px auto auto'} fontSize='larger' cursor={'pointer'} onClick={(e) => deleteCart(e, cart._id)} />
              </Flex>
              
              <Badge variant='subtle' colorScheme='green'>
                    {tiffin.time}
              </Badge>
            </CardBody>
        
            <CardFooter padding={'0 10px'}>
              <Stack direction={'row'} width='100%' justifyContent={'space-between'}>
                <Text margin={'auto 0'} fontWeight='bold' fontSize={'larger'}>{tiffin.price} ₹</Text>
                <HStack maxW='320px'>
                    <IconButton
                        colorScheme='blue'
                        borderRadius={'full'}
                        icon={<MinusIcon />}
                        height='30px'
                        minWidth={'unset'}
                        width={'30px'}
                        onClick={() => setItemQuantity((prev) => ( (prev > 1) ? prev-1 : 1))}
                        />
                    <Input padding={'4px'} width={'30px'} height='30px' textAlign={'center'} value={itemQuantity} onChange={ignoreChange}/>
                    <IconButton
                        colorScheme='blue'
                        borderRadius={'full'}
                        icon={<AddIcon />}
                        height='30px'
                        minWidth={'unset'}
                        width={'30px'}
                        onClick={() => setItemQuantity((prev) => prev+1)}
                        />
                </HStack>
              </Stack>
            </CardFooter>
          </Stack>
        </Card>
  )
}

export default OrderCard