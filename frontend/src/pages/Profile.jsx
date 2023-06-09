import { Avatar, Box, Button, Card, CardBody, CardFooter, FormControl, FormLabel, Grid, GridItem, Heading, Image, Input, Select, SimpleGrid, Stack, Text, Textarea, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddPG from '../models/AddPG';
import { getPGs, getProfile, updateProfile } from '../Redux/AppReducer/action';


const Profile = () => {
  
  const cardBgColor = useColorModeValue('white', 'gray.900');
  const [addPG , showAddPg] = useState(false);
  const user = useSelector((store) => store.AppReducer.user)
  const pgs = useSelector((store) => store.AppReducer.pg)
  const inputBgColor = useColorModeValue('input-light', 'input-dark');
  
  // console.log(pgs);
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
  const [loading, setLoading] = useState(false);
  const { name, email, mobile, room_no, description, address, pg, image } = formState;
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();

  useEffect(() => {
    
    setFormState({ 
      name : (user?.name) ? user?.name : "",
      email : (user?.email) ? user?.email : "",
      mobile : (user?.mobile) ? user?.mobile : "",
      room_no : (user?.room_no) ? user?.room_no : "",
      description : (user?.description) ? user?.description : "",
      address : (user?.address) ? user?.address : "",
      pg : (user?.pg_id) ? user?.pg_id : "",
      image : (user?.image) ? user?.image : "",
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
    setLoading(true);
    dispatch(updateProfile(formState))
    .then((res) => {
      setLoading(false);
      if(res?.type === 'USER_SUCCESS') {
        toast({
          title: "Profile Updated",
          position: 'top-right',
          isClosable: true,
          status: 'success' 
        })
      }
    } )
    .catch((err) => {
      setLoading(false);
      toast({
        title: err?.payload,
        position: 'top-right',
        isClosable: true,
        status: 'error' 
      })
    })
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
                { 
                (image) ? 
                  <Image
                    width={{ base: 40, md: 40, lg : 60 }}
                    height={{ base: 40, md: 40, lg : 60 }}
                    borderRadius='full'
                    margin={{base : 'auto auto 30px auto', md: '0 30px 0 0', lg: '0 30px 0 0'}}
                    src={image}
                    alt='Woman paying for a purchase'
                  /> : 
                  <Avatar
                    width={{ base: 40, md: 40, lg : 60 }}
                    height={{ base: 40, md: 40, lg : 60 }}
                    borderRadius='full'
                    margin={{base : 'auto auto 30px auto', md: '0 30px 0 0', lg: '0 30px 0 0'}}
                    size={'sm'}
                  />
                }
              </Box>
  {/* <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }} width='100%'> */}
              <SimpleGrid gap={'25px'} columns={[1, 2]} width='100%'>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input className={inputBgColor} type="text" name='name' value={name} onChange={handleChange} />
                </FormControl> 
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input className={inputBgColor} type="email" name='email' value={email} onChange={handleChange} />
                </FormControl> 
                <FormControl id="mobile">
                  <FormLabel>Mobile</FormLabel>
                  <Input className={inputBgColor} type="text" name='mobile' value={mobile} onChange={handleChange} />
                </FormControl> 
                {
                  (user?.role === "customer") ? 
                  <>
                    <FormControl id="room_no">
                      <FormLabel>Room No</FormLabel>
                      <Input className={inputBgColor} type="text" name='room_no' value={room_no} onChange={handleChange} />
                    </FormControl> 
                    <FormControl id="pg">
                    <FormLabel>Select PG</FormLabel>
                      <Select className={inputBgColor} placeholder={"Select PG"} name='select_pg' value={pg} onChange={handleChange} >
                      <option value='false'>Not in List</option>
                      {
                        pgs.length > 0 && pgs.map((item) => {
                          return <option key={item._id} value={item._id}>{item.name}</option>
                        })
                      }
                      </Select>
                    </FormControl>
                  </>
                  :
                  <FormControl id="description">
                    <FormLabel>Description</FormLabel>
                    <Textarea className={inputBgColor} name='description' value={description} onChange={handleChange} />
                  </FormControl>  
                } 
                
                <FormControl id="address">
                  <FormLabel>Address</FormLabel>
                  <Textarea className={inputBgColor} name='address' value={address} onChange={handleChange} />
                </FormControl>  
                <Button mt={8} 
                  colorScheme='blue' 
                  isLoading={loading}
                  loadingText="Saving..."
                  onClick={(e) => formSubmit(e)}
                  >Save</Button>
              </SimpleGrid>
  {/* </Box> */}
</Box>
          </Card>
    </>
  )
}

export default Profile