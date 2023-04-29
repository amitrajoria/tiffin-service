import { Box, Button, FormControl, FormLabel, HStack, Input, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addTiffin } from '../Redux/AppReducer/action'

const initState = {
    title : "",
    description : "Tiffin Provider",
    time : "",
    price : "",
    image : "",
}

const reducer = (state, action) => {
    switch(action.type) {
        case "title" :
            return {
                ...state,
                title : action.payload
            }
        case "description" :
            return {
                ...state,
                description : action.payload,
            }
        case "time" : 
            return {
                ...state,
                time : action.payload
            }
        case "price" : 
            return {
                ...state,
                price : action.payload
            }
        case "image" : 
            return {
                ...state,
                image : action.payload
            }
        default :
            return state;
    }
} 

function AddMenu({isOpen, onClose, vender_id}) {

    const [formState, setFormState] = useReducer(reducer, initState);
    const dispatch = useDispatch();
    const toast = useToast();
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)


    const createNewTiffin = () => {
      // console.log(formState);
      // console.log(vender_id);
      const {title, description, time, price, image} = formState;
      if(!title?.trim() || !description?.trim() || !time?.trim() || !price?.trim() || !image?.trim() ) {
        alert("All form fields are Reuired ");
        return ;
      }
      dispatch(addTiffin(formState, vender_id))
      .then((res) => {
        if(res?.type === "TIFFIN_SUCCESS") {
          toast({
            title: "Tiffin Added Successfully",
            position: 'top-right',
            isClosable: true,
            status: 'success' 
          })
        }

        if(res?.type != "TIFFIN_FAILURE")
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
            <ModalHeader>Create New Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input ref={initialRef} placeholder='Title' value={formState.title} onChange={(e) => setFormState({type: "title", payload: e.target.value})} />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder='Description' value={formState.description} onChange={(e) => setFormState({type: "description", payload: e.target.value})} />
              </FormControl> 
              
              <HStack>
                <Box>
                  <FormControl mt={4}>
                    <FormLabel>Tiffin Time</FormLabel>
                    <Input placeholder='Tiffin Time' value={formState.time} onChange={(e) => setFormState({type: "time", payload: e.target.value})} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl mt={4}>
                    <FormLabel>Price ₹</FormLabel>
                    <Input placeholder='Price' value={formState.price} onChange={(e) => setFormState({type: "price", payload: e.target.value})} />
                  </FormControl>
                </Box>
              </HStack>

              <FormControl mt={4}>
                <FormLabel>Image URL</FormLabel>
                <Input placeholder='Image URL' value={formState.image} onChange={(e) => setFormState({type: "image", payload: e.target.value})} />
              </FormControl> 

            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={createNewTiffin}>
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default AddMenu