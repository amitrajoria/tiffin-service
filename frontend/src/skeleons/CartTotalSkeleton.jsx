import { Box, SimpleGrid, Skeleton, SkeletonText, Stack } from '@chakra-ui/react'
import React from 'react'


const CartTotalSkeleton = () => {
  return (
    <>
        <Box width={{ base: 'auto', sm: 'auto', md : '360px' }}>
            <Skeleton height={'30px'} borderRadius={5} my={5} />
            <SkeletonText mt='4' noOfLines={2} spacing='3' skeletonHeight='2' />
            <Skeleton height={'30px'} borderRadius={5} my={5} />
            <SkeletonText mt='4' noOfLines={3} spacing='4' skeletonHeight='2' />
            <Skeleton height={'30px'} borderRadius={5} my={5} />
            <SkeletonText mt='4' noOfLines={2} spacing='2' skeletonHeight='2' />
        </Box>
    </>
  )
}

export default CartTotalSkeleton