import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const VenderCard = ({ vender, subscribe, selectedVender }) => {

    const cardBgColor = useColorModeValue('white', '#292b34');

  return (
    <Card
            bg={cardBgColor}
            borderColor={cardBgColor}
            padding={4}
            borderRadius={'10px'}
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
          >
            <Image
              objectFit='cover'
              maxW={{ base: '100%', sm: '200px' }}
              src={ vender.image || 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'}
              alt='Caffe Latte'
            />
          
            <Stack>
              <CardBody paddingTop={{ base: 'auto', sm: 0, md: 0 }} paddingBottom={{ base: 'auto', sm: 0, md: 0 }}>
                <Heading size='md'>{vender.name}</Heading>
          
                <Text py='2' height={'86px'} overflow={'hidden'}>
                  { vender.description ||  "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk."}
                </Text>
                <Text paddingBottom={'2'} color={'grey'} height={'52px'} overflow={'hidden'}>
                  { vender.address }
                </Text>
              </CardBody>
          
              <CardFooter paddingBottom={'0'} paddingTop={'0px'}>
                <Button variant='solid' colorScheme='blue' onClick={() => subscribe(vender._id)}>
                  {(vender._id && vender._id === selectedVender) ? 'Unsubscribe' : 'Subscribe'}
                </Button>
              </CardFooter>
            </Stack>
          </Card>
  )
}

export default VenderCard