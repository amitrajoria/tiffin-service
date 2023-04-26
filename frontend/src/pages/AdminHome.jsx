import { Button, Flex, Heading, Skeleton, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getVenders } from '../Redux/AppReducer/action';
import AddVender from '../models/AddVender';

const AdminHome = () => {

  const dispatch = useDispatch();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const tableBgColor = useColorModeValue('white', '#292b34');
  const venders = useSelector((store) => store.AppReducer.venders);
  const [showVenders, setShowVenders] = useState(null);


  useEffect(() => {
    if(venders.length === 0) {
        dispatch(getVenders())
        .then((res) => {if(res.type == "VENDER_SUCCESS") {
            if(res?.payload?.length > 0)
                setShowVenders(true);
            else 
                setShowVenders(false);
            }
            else 
                setShowVenders(false);
        })
    }
    else if(venders.length > 0)
        setShowVenders(true);

  }, [venders.length])


  return (
    <> 
    {
      (showVenders === null) && 
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

    <AddVender isOpen={isOpen} onClose={onClose}/> 
        <Flex justify={'space-between'} margin={'20px 0'}>
            <Heading as='h3' size='lg' margin={'10px 0'}>{(showVenders !== null && ((showVenders) ? "All Venders" : "You haven't got any vender yet"))}</Heading>
            <Button variant='outline' colorScheme='blue' onClick={onOpen}>
                Add Vender
            </Button>
        </Flex>
        
        {
        showVenders && venders?.length > 0 && 
        <TableContainer background={tableBgColor} rounded={'lg'}>
            <Table variant='simple'>
                <TableCaption>All Venders with their Detail</TableCaption>
                <Thead>
                <Tr>
                    <Th isNumeric>#</Th>
                    <Th>Name</Th>
                    <Th>Mobile</Th>
                    <Th>Email</Th>
                    <Th>Address</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        showVenders && venders?.length > 0 && 
                        venders.map((vender, index) => {
                            return <Tr key={vender._id}>
                                <Td isNumeric>{index+1}</Td>
                                <Td>{vender?.name}</Td>
                                <Td>{vender?.mobile}</Td>
                                <Td>{vender?.email}</Td>
                                <Td>{vender?.address}</Td>
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

export default AdminHome