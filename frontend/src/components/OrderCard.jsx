import { AddIcon, DeleteIcon, MinusIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Badge, Button, Card, CardBody, CardFooter, Flex, Heading, HStack, IconButton, Image, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bookOrder, deleteCartItem, getCart } from '../Redux/AppReducer/action';

const OrderCard = ({ tiffin, vender_id, cart, setQuantity, quantity, historyQuantity, deleteCart }) => {

    const cardBgColor = useColorModeValue('white', '#292b34');
    const inputBgColor = useColorModeValue('input-light', 'input-dark');
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
          borderColor={cardBgColor}
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
                {
                  !historyQuantity && 
                  <DeleteIcon margin={'5px -3px auto auto'} 
                    fontSize='larger' 
                    cursor={'pointer'} 
                    onClick={(e) => deleteCart(e, cart._id)} 
                  />
                }
                {
                  historyQuantity && <Text fontSize='lg' fontWeight={'bold'}><SmallCloseIcon marginTop={'-4px'} /> {historyQuantity}</Text>
                }
              </Flex>
              
              <Badge variant='subtle' colorScheme='green'>
                    {tiffin.time}
              </Badge>
            </CardBody>
        
            <CardFooter padding={'0 10px'}>
              <Stack direction={'row'} width='100%' justifyContent={'space-between'}>
                <Text margin={'auto 0'} fontWeight='bold' fontSize={'larger'}>{tiffin.price} ₹</Text>
                {
                !historyQuantity && <HStack maxW='320px'>
                    <IconButton
                        colorScheme='blue'
                        borderRadius={'full'}
                        icon={<MinusIcon />}
                        height='30px'
                        minWidth={'unset'}
                        width={'30px'}
                        onClick={() => setItemQuantity((prev) => ( (prev > 1) ? prev-1 : 1))}
                        />
                    <Input className={inputBgColor} padding={'4px'} width={'30px'} height='30px' textAlign={'center'} value={itemQuantity} onChange={ignoreChange}/>
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
                }
              </Stack>
            </CardFooter>
          </Stack>
        </Card>
  )
}

export default OrderCard