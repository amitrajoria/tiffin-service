import { SimpleGrid, Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const cardStyle = {
    height: '110px',
    borderRadius: 10,
    bg: 'green.500',
    color: 'white',
    fadeDuration: '1'   
}

const CartCardSkeleton = () => {
  return (
    <>
        <Skeleton style={cardStyle} width={{ base: 'auto', sm: 'auto', md : '360px' }}/>
        <Skeleton style={cardStyle} width={{ base: 'auto', sm: 'auto', md : '360px' }}/>
        <Skeleton style={cardStyle} width={{ base: 'auto', sm: 'auto', md : '360px' }}/>
    </>
  )
}

export default CartCardSkeleton