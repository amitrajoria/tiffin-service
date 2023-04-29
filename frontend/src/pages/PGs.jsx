import { Button, Flex, Heading, Skeleton, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPGRegistered } from '../Redux/AppReducer/action';
import TableSkeleton from '../skeleons/TableSkeleton';

const PGs = () => {

    const dispatch = useDispatch();
    const tableBgColor = useColorModeValue('white', '#292b34');
    const [PGAvailable, setPGAvailable] = useState(null);
    const [PGs, setPGs] = useState([]);

    useEffect(() => {
        dispatch(getPGRegistered())
        .then((res) => {
            // console.log(res);
            if(res.type === "SUCCESS") {
                if(res?.payload?.length > 0) {
                    setPGAvailable(true);
                    setPGs(res.payload);
                }
                else 
                    setPGAvailable(false);
            }
        })
        .catch((err) => {
            console.log(err);
            alert(err?.payload);
        })
    }, [PGs.length])

    // console.log(PGs);
    // console.log(PGAvailable);

  return (
    <>
        <Flex justify={'space-between'} margin={'20px 0'}>
            <Heading as='h3' size='lg'>{PGAvailable !== null && (PGAvailable ? "All PGs" : "No PG Registered")}</Heading>
        </Flex>
        {
            PGAvailable === null && 
            <Stack>
                <Skeleton width={'100px'} height={'30px'} borderRadius={5} marginBottom={4} display={'flex'} />
                <TableSkeleton />
            </Stack>
            
        }
        
        {
        PGAvailable && PGs?.length > 0 && 
        <TableContainer background={tableBgColor} rounded={'lg'}>
            <Table variant='simple'>
                <TableCaption>Registered PGs with total number of Customers</TableCaption>
                <Thead>
                <Tr>
                    <Th isNumeric>#</Th>
                    <Th>Name</Th>
                    <Th>Address</Th>
                    <Th>Total Customers</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        PGAvailable && PGs?.length > 0 && 
                        PGs.map((item, index) => {
                            const pg = item?.pg[0];
                            return <Tr key={item._id}>
                                <Td isNumeric>{index+1}</Td>
                                <Td>{pg?.name}</Td>
                                <Td>{pg?.address}</Td>
                                <Td>{item?.count}</Td>
                            </Tr>
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
        }
    </>
  )
}

export default PGs