import { Box, Button, FormControl, FormLabel, HStack, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useReducer, useState } from 'react'
import { useDispatch} from 'react-redux'
import { addVender } from '../Redux/AppReducer/action'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const initState = {
    firstName : "",
    lastName : "",
    mobile : "",
    email : "",
    password : "",
    address : "",
}

const reducer = (state, action) => {
    switch(action.type) {
        case "firstName" :
            return {
                ...state,
                firstName : action.payload
            }
        case "lastName" :
            return {
                ...state,
                lastName : action.payload,
            }
        case "mobile" : 
            return {
                ...state,
                mobile : action.payload
            }
        case "email" : 
            return {
                ...state,
                email : action.payload
            }
        case "password":
            return {
                ...state,
                password : action.payload
            }
        case "address" : 
            return {
                ...state,
                address : action.payload
            }
        default :
            return state;
    }
} 

function AddVender({isOpen, onClose}) {

    const [formState, setFormState] = useReducer(reducer, initState);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const inputBgColor = useColorModeValue('input-light', 'input-dark');  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const toast = useToast();


    const addNewVender = () => {
      console.log(formState);
      let {firstName, lastName, mobile, email, password, address} = formState;
      firstName = firstName?.trim();
      lastName = lastName?.trim();
      mobile = mobile?.trim();
      email = email?.trim();
      password = password?.trim();
      address = address?.trim();
      if(!firstName || !lastName || !mobile || !email || !password || !address ) {
        alert("All form fields are Reuired ");
        return ;
      }
      dispatch(addVender({name: firstName+" "+lastName, mobile, email, password, address, role: "vender"}))
      .then((res) => {
        console.log(res);
        if(res?.type === "VENDER_SUCCESS") {
          toast({
            title: "Vender Added Successfully",
            position: 'top-right',
            isClosable: true,
            status: 'success' 
          })
        }

        if(res?.type != "FAILURE")
          onClose();
      });
    }


    return (
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Vender</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <HStack>
                    <Box>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input className={inputBgColor} ref={initialRef} placeholder='First Name' value={formState.firstName} onChange={(e) => setFormState({type: "firstName", payload: e.target.value})} />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input className={inputBgColor} placeholder='Last Name' value={formState.lastName} onChange={(e) => setFormState({type: "lastName", payload: e.target.value})} />
                        </FormControl>
                    </Box>
                </HStack>
  
                <FormControl mt={4}>
                    <FormLabel>Mobile</FormLabel>
                    <Input className={inputBgColor} placeholder='Mobile' value={formState.mobile} onChange={(e) => setFormState({type: "mobile", payload: e.target.value})} />
                </FormControl> 
              
                <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input className={inputBgColor} placeholder='Email' value={formState.email} onChange={(e) => setFormState({type: "email", payload: e.target.value})} />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input className={inputBgColor} type={showPassword ? 'text' : 'password'} value={formState.password} onChange={(e) => setFormState({type: "password", payload: e.target.value})} />
                        <InputRightElement h={'full'}>
                            <Button
                            variant={'ghost'}
                            onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                            }>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                
                <FormControl mt={4}>
                    <FormLabel>Address</FormLabel>
                    <Textarea className={inputBgColor} placeholder='Address' value={formState.address} onChange={(e) => setFormState({type: "address", payload: e.target.value})} />
                </FormControl>
            
            </ModalBody>
  
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={addNewVender}>
                    Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default AddVender