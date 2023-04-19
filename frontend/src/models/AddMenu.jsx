import { Button, FormControl, FormLabel, Input, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { createTask, getTasks } from '../redux/AppReducer/action'

const initState = {
    title : "",
    description : "Default description",
    taskStatus : "todo",
    tags : ["Others"],
    subTasks : [],
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
        case "taskStatus" : 
            return {
                ...state,
                taskStatus : action.payload
            }
        case "tags" : 
            return {
                ...state,
                tags : action.payload
            }
        default :
            return state;
    }
} 

function AddMenu({isOpen, onClose}) {

    const [formState, setFormState] = useReducer(reducer, initState);
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const location = useLocation();
    const { onOpen } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)


    const createNewTask = () => {
      dispatch(createTask(formState))
      .then((res) => {
        if(res?.type != "TASKS_FAILURE")
          onClose();
      });
    }
    
    useEffect(() => {
      if(response)
        alert(response);
      if(!isError) {
        onClose();
      }
    }, [isError, response])

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

              <FormControl mt={4}>
                <FormLabel>Task Status</FormLabel>  
                <Select placeholder='Task Status'  value={formState.taskStatus} onChange={(e) => setFormState({type: "taskStatus", payload: e.target.value})} >
                    <option value='todo'>Todo</option>
                    <option value='in-progres'>In-Progess</option>
                    <option value='done'>Done</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Task Tags</FormLabel>
                <Menu closeOnSelect={false}>
                    <MenuButton as={Button}>
                        Select Tags
                    </MenuButton>
                    <MenuList>
                        <MenuOptionGroup title='Tags' type='checkbox'  value={formState.tags} onChange={(value) => setFormState({type: "tags", payload: value})} >
                            {
                                allTags.length > 0 && 
                                allTags.map((item) => {
                                    return <MenuItemOption key={item._id} value={item.tag}>{item.tag}</MenuItemOption>
                                })
                            }
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>
              </FormControl>


            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={createNewTask}>
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