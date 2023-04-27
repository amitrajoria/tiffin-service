import { SimpleGrid, Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const cardStyle = {
    width: '100%',
    height: '200px',
    borderRadius: 10,
    bg: 'green.500',
    color: 'white',
    fadeDuration: '1'   
}

const ProvidersSkeleton = () => {
  return (
    <>
        <Stack padding={4} spacing={1} display={'flex'} mt={6} >
            <Skeleton width={'80px'} height={'30px'} borderRadius={5} my={4} />
            <SimpleGrid columns={[1, 1, 2]} spacing='40px' mt={'30px'}>
                <Skeleton
                    style={cardStyle}
                />
                <Skeleton
                    style={cardStyle}
                />
                <Skeleton
                    style={cardStyle}
                />
                <Skeleton
                    style={cardStyle}
                />
                <Skeleton
                    style={cardStyle}
                />
            </SimpleGrid>
        </Stack>
    </>
  )
}

export default ProvidersSkeleton