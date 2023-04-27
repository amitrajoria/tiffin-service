import { Box, SimpleGrid, Skeleton } from '@chakra-ui/react'
import React from 'react'

const cardStyle = {
  height: '110px',
  borderRadius: 10,
  bg: 'green.500',
  color: 'white',
  marginTop : '4',
  fadeDuration: '1'   
}

const OrderHistorySkeleton = () => {
  return (
    <>
      <SimpleGrid columns={[1, 1, 2]} spacing='40px' mt={'30px'}>
        <Box width={{ base: 'auto', sm: 'auto', md : '360px' }}>
            <Skeleton height={'14px'} borderRadius={5} my={4} />
            <Skeleton height={'14px'} borderRadius={5} my={4} />
            <Skeleton style={cardStyle} width={{ base: 'auto', sm: 'auto', md : '360px' }}/>
            <Skeleton style={cardStyle} width={{ base: 'auto', sm: 'auto', md : '360px' }}/>
        </Box>
        <Box width={{ base: 'auto', sm: 'auto', md : '360px' }}>
            <Skeleton height={'14px'} borderRadius={5} my={4} />
            <Skeleton height={'14px'} borderRadius={5} my={4} />
            <Skeleton style={cardStyle} width={{ base: 'auto', sm: 'auto', md : '360px' }}/>
            <Skeleton style={cardStyle} width={{ base: 'auto', sm: 'auto', md : '360px' }}/>
        </Box>
        <Box width={{ base: 'auto', sm: 'auto', md : '360px' }}>
            <Skeleton height={'14px'} borderRadius={5} my={4} />
            <Skeleton height={'14px'} borderRadius={5} my={4} />
            <Skeleton style={cardStyle} width={{ base: 'auto', sm: 'auto', md : '360px' }}/>
            <Skeleton style={cardStyle} width={{ base: 'auto', sm: 'auto', md : '360px' }}/>
        </Box>
      </SimpleGrid>
    </>
  )
}

export default OrderHistorySkeleton