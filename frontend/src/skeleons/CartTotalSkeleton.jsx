import { Box, SimpleGrid, Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'


const CartTotalSkeleton = () => {
  return (
    <>
        <Box width={{ base: 'auto', sm: 'auto', md : '360px' }}>
            <Skeleton height={'30px'} borderRadius={5} my={5} />
            <Skeleton height={'10px'} borderRadius={5} my={2} />
            <Skeleton height={'10px'} borderRadius={5} my={2} />
            <Skeleton height={'30px'} borderRadius={5} my={5} />
            <Skeleton height={'10px'} borderRadius={5} my={2} />
            <Skeleton height={'10px'} borderRadius={5} my={2} />
            <Skeleton height={'30px'} borderRadius={5} my={5} />
        </Box>
    </>
  )
}

export default CartTotalSkeleton