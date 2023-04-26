import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { useEffect, useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useNavigate, Link as ReactLink, useSearchParams } from 'react-router-dom';
import { register } from '../Redux/AuthReducer/action';
import { useDispatch, useSelector } from 'react-redux';




  export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const inputBgColor = useColorModeValue('input-light', 'input-dark');
    const [searchParams, setSearchParams] = useSearchParams();
    const [vender_id, SetVender_id] = useState(searchParams.get("vender") || "");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nevigate = useNavigate();
    const dispatch = useDispatch();
    // const response = useSelector((store) => store.AuthReducer.response);

    const signup = () => {
        setFirstName(firstName?.trim());
        setLastName(lastName?.trim());
        setEmail(email?.trim());
        setPassword(password?.trim());
        if(!firstName || !lastName || !email || !password) {
          alert("All Form Fields are Required");
          return ;
        }
        dispatch(register({name : firstName+" "+lastName, email , password, vender_id}))
        .then((res) => {
            alert(res?.payload);
            if(res?.payload == "Signup Successfull")
                nevigate('/login', {replace : true});
        })
    }
    
    // useEffect(() => {
    //   if(response === "Signup Successfull")
    //     nevigate('/login', {replace : true});
    // }, [response])

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input className={inputBgColor} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input className={inputBgColor} type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input className={inputBgColor} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input className={inputBgColor} type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
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
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }} 
                  onClick={signup}
                  >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <ReactLink to={'/login'}>Login</ReactLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }