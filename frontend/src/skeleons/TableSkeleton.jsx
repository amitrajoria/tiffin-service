import { Box, SimpleGrid, Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const tableStyle = {
    width: '100%',
    height: '40px',
    bg: 'green.500',
    margin: '1px',
    color: 'white',
    fadeDuration: '1'   
}

const TableSkeleton = () => {
  return (
    <>
        <Stack spacing={1} display={'flex'}>
            <Box my={4}>
                <Skeleton
                    style={tableStyle}
                />
                <Skeleton
                    style={tableStyle}
                />
                <Skeleton
                    style={tableStyle}
                />
                <Skeleton
                    style={tableStyle}
                />
                <Skeleton
                    style={tableStyle}
                />
            </Box>
        </Stack>
    </>
  )
}

export default TableSkeleton