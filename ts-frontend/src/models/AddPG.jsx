import { Button, Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addPG, getPGs } from "../Redux/AppReducer/action"

function AddPG({isOpen, onClose}) {
    const { onOpen } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [name , setName] = useState("");
    const [address, setAddress] = useState("");
    const dispatch = useDispatch();
    const pgLoading = useSelector((store) => store.AppReducer.pgLoading);


    const savePG = () => {
        dispatch(addPG({name, address}))
        .then((res) => {
          if(res?.type != "PG_FAILURE")
            onClose();
        })
        // .then((res) => console.log(res))
        // .catch((err) => console.log(err?.message));
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
            <ModalHeader>Add your PG</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>PG Name</FormLabel>
                <Input ref={initialRef} placeholder='PG Name' onChange={(e) => setName(e.target.value)} />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>PG Address</FormLabel>
                <Textarea placeholder='PG Address' onChange={(e) => setAddress(e.target.value)} />
              </FormControl>
            </ModalBody>
            <Center>{pgLoading && "Adding PG..."}</Center>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={savePG}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }


export default AddPG