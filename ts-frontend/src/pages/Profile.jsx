import { Box, Button, Card, CardBody, CardFooter, FormControl, FormLabel, Grid, GridItem, Heading, Image, Input, Select, SimpleGrid, Stack, Text, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddPG from '../models/AddPG';
import { getPGs, getProfile, updateProfile } from '../Redux/AppReducer/action';


const Profile = () => {
  
  const cardBgColor = useColorModeValue('white', 'gray.900');
  const [addPG , showAddPg] = useState(false);
  const user = useSelector((store) => store.AppReducer.user)
  const pgs = useSelector((store) => store.AppReducer.pg)
  
  console.log(pgs);
  const initState = {
    name : "",
    email : "",
    mobile : "",
    room_no : "",
    description : "",
    address : "",
    pg_id : ""
  }
  const [formState, setFormState] = useState(initState);
  console.log(user);
  const { name, email, mobile, room_no, description, address, pg } = formState;
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    // if(Object.keys(user).length === 0 )
    //   dispatch(getProfile())
    // const { name, email, mobile, room_no, description, address, pg } = user;
    setFormState({ 
      name : (user?.name) ? user?.name : "",
      email : (user?.email) ? user?.email : "",
      mobile : (user?.mobile) ? user?.mobile : "",
      room_no : (user?.room_no) ? user?.room_no : "",
      description : (user?.description) ? user?.description : "",
      address : (user?.address) ? user?.address : "",
      pg_id : (user?.pg_id) ? user?.pg_id : ""
    });
  }, [user])


  useEffect(() => {
    if(pgs.length == 0)
      dispatch(getPGs())
  }, [pgs.length])

  useEffect(() => {
    if(addPG)
      onOpen();
  }, [addPG])

  const handleChange = (e) => {
    // console.log(e.target.name+" "+e.target.value);
    if (e.target.name ===  "select_pg") {
      if(e.target.value === "false") { 
        showAddPg(true);
        setFormState({...formState, ['pg_id'] : ''});
      }
      else {
        showAddPg(false);
        setFormState({...formState, ['pg_id'] : e.target.value});
      }
    }
    // else if(e.target.name ===  "pg")
    //   setFormState({...formState, ['pg'] : e.target.value});  
    else 
      setFormState({...formState, [e.target.name] : e.target.value});
  }

  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formState))
    .then((res) => {
      if(res?.type == 'USER_SUCCESS')
        console.log("Profile Updated");
    } )
    .catch((err) => console.log(err))
  }
  
  return (
    <>
      <Heading as='h3' size='lg' margin={'10px 0'}>User Profile</Heading>
      <AddPG isOpen={isOpen} onClose={onClose}/> 
      <Card
            bg={cardBgColor}
            padding={4}
            mt={6}
            borderRadius={'10px'}
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            // key={vender._id}
          >
            <Box p={4} display={{ md: 'flex' }} width='100%' >
              <Box flexShrink={0} margin={{base : 'auto auto 30px auto', md: '0 30px 0 0', lg: '0 30px 0 0'}}>
                <Image
                  width={{ base: 40, md: 40, lg : 60 }}
                  height={{ base: 40, md: 40, lg : 60 }}
                  borderRadius='full'
                  margin={{base : 'auto auto 30px auto', md: '0 30px 0 0', lg: '0 30px 0 0'}}
                  src='https://bit.ly/2jYM25F'
                  alt='Woman paying for a purchase'
                />
              </Box>
  {/* <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }} width='100%'> */}
              <SimpleGrid gap={'25px'} columns={[1, 2]} width='100%'>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input type="text" name='name' value={name} onChange={handleChange} />
                </FormControl> 
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name='email' value={email} onChange={handleChange} />
                </FormControl> 
                <FormControl id="mobile">
                  <FormLabel>Mobile</FormLabel>
                  <Input type="text" name='mobile' value={mobile} onChange={handleChange} />
                </FormControl> 
                <FormControl id="room_no">
                  <FormLabel>Room No</FormLabel>
                  <Input type="text" name='room_no' value={room_no} onChange={handleChange} />
                </FormControl>
                {/* <FormControl id="description">
                  <FormLabel>Description</FormLabel>
                  <Textarea name='description' value={description} onChange={handleChange} />
                </FormControl>  */}
                <FormControl id="address">
                  <FormLabel>Address</FormLabel>
                  <Textarea name='address' value={address} onChange={handleChange} />
                </FormControl> 
                <FormControl id="pg">
                  <FormLabel>Select PG</FormLabel>
                  <Select placeholder={pg} name='select_pg' value={pg} onChange={handleChange} >
                    <option value='false'>Not in List</option>
                    {
                      pgs.length > 0 && pgs.map((item) => {
                        return <option key={item._id} value={item._id}>{item.name}</option>
                      })
                    }
                  </Select>
                </FormControl>  
                {/* <FormControl id="addpg">
                  {addPG && <div>
                    <FormLabel>Add PG</FormLabel>
                    <Input type="text" name='pg' value={pg} onChange={handleChange} />
                  </div>
                   }
                  </FormControl>  */}
                <Button mt={6} colorScheme='blue' onClick={(e) => formSubmit(e)}>Save</Button>
              </SimpleGrid>
  {/* </Box> */}
</Box>
          </Card>
    </>
  )
}

export default Profile