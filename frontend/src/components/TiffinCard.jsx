import { Badge, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/AppReducer/action';

const TiffinCard = ({ tiffin, vender_id, cart, bookedId, buttonText, updateStatus }) => {

    const cardBgColor = useColorModeValue('white', '#292b34');
    const dispatch = useDispatch();
    const [disable, setDisable] = useState(false);

    // console.log(cart);


    const book = (id, price) => {
      setDisable("isDisabled");
      if(bookedId.includes(id))
        alert("Already Booked");
        
        const payload = {
            tiffin_id : id, 
            vender_id
        }
        dispatch(addToCart(payload))
        .then((res) => {
            if(res?.type == "ORDER_SUCCESS")
                console.log("Order Placed");
        })
        .catch((err) => console.log(err))
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
        >
          <Badge variant='subtle' colorScheme='green' position='absolute' margin='-8px' background={'inherit'} >
            {tiffin.time}
          </Badge>
          <Image
            objectFit='cover'
            // maxW={{ base: '100%', sm: '200px' }}
            borderRadius={'10px'}
            width={{ base: '100%', sm: 140, md: 100, lg : 140 }}
            height={{ base: '100%', sm:140, md: 100, lg : 140 }}
            src={ tiffin.image || 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'}
            alt='Caffe Latte'
          />
        
          <Stack width={'100%'}>
            <CardBody padding={'0 10px'}>
              <Heading size='md'>{tiffin.title}</Heading>
        
              <Text py='2' height={'55px'} overflow={'hidden'}>
                { tiffin.description ||  "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk."}
              </Text>
            </CardBody>
        
            <CardFooter padding={'0 10px'}>
              <Stack direction={'row'} width='100%' justifyContent={'space-between'}>
                <Text margin={'auto 0'} fontWeight='bold' fontSize={'larger'}>{tiffin.price} ₹</Text>
                { (buttonText) ? 
                  <Button variant='solid' colorScheme='blue' onClick={() => updateStatus(tiffin._id, !tiffin.status)}>
                    {buttonText}
                  </Button> 
                  :
                  <Button variant='solid' colorScheme='blue' isDisabled={disable || bookedId.includes(tiffin._id)} onClick={() => book(tiffin._id, tiffin.price)}>
                    {(bookedId.includes(tiffin._id)) ? "Booked" : "Book"}
                  </Button>
                }
              </Stack>
            </CardFooter>
          </Stack>
        </Card>
  )
}

export default TiffinCard