import { Button, Flex, Heading, Skeleton, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, getProfile } from '../Redux/AppReducer/action';
import TableSkeleton from '../skeleons/TableSkeleton';

const Customers = () => {

    const dispatch = useDispatch();
    const tableBgColor = useColorModeValue('white', '#292b34');
    const [customersAvailable, setCustomersAvailable] = useState(null);
    const [Customers, setCustomers] = useState([]);
    const toast = useToast();
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
        navigator.clipboard.writeText(`http://localhost:3000/register?vender=${user._id}`);
        alert("Link Copied to Clipboard");
        toast({
            title: "Link Copied to Clipboard",
            position: 'top-right',
            isClosable: true,
            status: 'success' 
          })
    }

  return (
    <>
        <Flex justify={'space-between'} margin={'20px 0'} direction={{ base: 'column', sm: 'row', md : 'row' }}>
            <Heading as='h3' size='lg' marginBottom={5}>{customersAvailable !== null && ((customersAvailable) ? `All Customers (${Customers?.length})` : "You haven't any registered Customer")}</Heading>
            <Button variant='outline' colorScheme='blue' onClick={(e) => copyLink(e)}>
                Copy Add Customer Link
            </Button>
        </Flex>
        {
            customersAvailable === null && 
            <Stack>
                <Skeleton width={'100px'} height={'30px'} borderRadius={5} marginBottom={4} display={'flex'} />
                <TableSkeleton />
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