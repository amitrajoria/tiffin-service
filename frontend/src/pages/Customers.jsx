import { Button, Flex, Heading, Skeleton, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, getProfile } from '../Redux/AppReducer/action';

const Customers = () => {

    const dispatch = useDispatch();
    const tableBgColor = useColorModeValue('white', '#292b34');
    const [customersAvailable, setCustomersAvailable] = useState(null);
    const [Customers, setCustomers] = useState([]);
    const user = useSelector((store) => store.AppReducer.user);

    useEffect(() => {
        if(!user)
            dispatch(getProfile())
    }, [user])

    useEffect(() => {
        dispatch(getCustomers())
        .then((res) => {
            if(res.type === "SUCCESS") {
                setCustomers(res.payload);
                if(res?.payload?.length > 0)
                    setCustomersAvailable(true);
                else 
                    setCustomersAvailable(false);
            }
        })
        .catch((err) => {
            console.log(err);
            alert(err?.payload);
        })
    }, [Customers.length])

    // console.log(Customers);

    const copyLink = (e) => {
        navigator.clipboard.writeText(`http://localhost:3000/registered/?vender=${user._id}`);
        alert("Link Copied to Clipboard");
    }

  return (
    <>
        <Flex justify={'space-between'} margin={'20px 0'}>
            <Heading as='h3' size='lg'>{customersAvailable && "All Customers"}</Heading>
            <Button variant='outline' colorScheme='blue' onClick={(e) => copyLink(e)}>
                Share Add Customer Link
            </Button>
        </Flex>
        {
            customersAvailable === null && 
            <Stack padding={4} spacing={1}>
                <Skeleton height='40px'>
                </Skeleton>
                <Skeleton
                    height='40px'
                    bg='green.500'
                    color='white'
                    fadeDuration={1}
                >
                </Skeleton>
                <Skeleton
                    height='40px'
                    fadeDuration={4}
                    bg='blue.500'
                    color='white'
                >
                </Skeleton>
            </Stack>
        }
        
        {
        customersAvailable && Customers?.length > 0 && 
        <TableContainer background={tableBgColor} rounded={'lg'}>
            <Table variant='simple'>
                <TableCaption>Customers with registered PG</TableCaption>
                <Thead>
                <Tr>
                    <Th isNumeric>#</Th>
                    <Th>Name</Th>
                    <Th>Mobile</Th>
                    <Th>Address</Th>
                    <Th>PG</Th>
                    <Th>Room No.</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        customersAvailable && Customers?.length > 0 && 
                        Customers.map((customer, index) => {
                            return <Tr key={customer._id}>
                                <Td isNumeric>{index+1}</Td>
                                <Td>{customer?.name}</Td>
                                <Td>{customer?.mobile}</Td>
                                <Td>{customer?.address}</Td>
                                <Td>{customer?.pg?.name}</Td>
                                <Td>{customer?.room_no}</Td>
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

export default Customers