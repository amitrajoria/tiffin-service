import { Button, Flex, Heading, SimpleGrid, Skeleton, Stack, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TiffinCard from '../components/TiffinCard';
import VenderCard from '../components/VenderCard';
import { getCart, getProfile, getTiffins, getVenders, updateProfile, updateTiffinStatus } from '../Redux/AppReducer/action';

const Menu = () => {

  const dispatch = useDispatch();
  const {user, tiffins} = useSelector((store) => (
    {
      user : store.AppReducer.user,
      tiffins : store.AppReducer.tiffin
    }
  ));
  const [tiffinAvailable, setTiffinAvailable] = useState(null);
  const [ActiveTiffins, setActiveTiffins] = useState(0);
  const [NonActiveTiffins, setNonActiveTiffins] = useState(0);
  const headingColor = useColorModeValue('dimgray', 'lightgray');
  const [tiffinHeading, setTiffinHeading] = useState((tiffins.length > 0) ? "Today's Menu" : "");
    

  useEffect(() => {
    if(!user)
        dispatch(getProfile())
  }, [user])

  // useEffect(() => {
  //   console.log("Working USE EFFECT");
  //   setNonActiveTiffins(null);
  //   setActiveTiffins(null);
  //     for(let i=0; i<tiffins.length; i++) {
  //       const tiffin = tiffins[i];
  //       if(tiffin.status && ActiveTiffins === null)
  //         setActiveTiffins(true)
  //       else if(!tiffin.status && NonActiveTiffins === null)
  //         setNonActiveTiffins(true)
  //     }
  // }, [tiffins])

  useEffect(() => {    
    if(tiffins.length === 0) {
      console.log(user);
      dispatch(getTiffins(user?._id))
      .then((res) => {
        if(res?.type === "TIFFIN_SUCCESS") {
            if(res?.payload.length > 0) {
                setTiffinHeading("Menus");
                setTiffinAvailable(true);
            }
            else {
                setTiffinHeading("You don't have any Menu");
                setTiffinAvailable(false);
            }
        }
      })
    }

    if(tiffins.length > 0) {
      console.log("WORKING --- 222");
      setNonActiveTiffins(null);
      setActiveTiffins(null);
      for(let i=0; i<tiffins.length; i++) {
        const tiffin = tiffins[i];
        if(tiffin.status)
          setActiveTiffins(prev => prev+1)
        else if(!tiffin.status)
          setNonActiveTiffins(prev => prev+1)
      }
    }

}, [tiffins.length, user?.vender_id])

  console.log(tiffins);

  const updateStatus = (id, status) => {
    console.log(user);
    console.log(id+" "+status+" "+user?._id);
    dispatch(updateTiffinStatus({id, status, vender_id: user?._id}))
    .then((res) => { 
      if(res?.type === "TIFFIN_SUCCESS") {
        console.log("Tiffin updated successfully");
        if(status) {
          setActiveTiffins(prev => prev+1);
          setNonActiveTiffins(prev => prev-1);
        }
        else {
          setActiveTiffins(prev => prev-1);
          setNonActiveTiffins(prev => prev+1);}
      }
    })
  }

  console.log("ACTIVE TIFFIN ", ActiveTiffins);
  console.log("NOT ACTIVE TIFFIN ", NonActiveTiffins);
  
  return (
    <> 
    {
      tiffinAvailable === null && 
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

    {tiffinAvailable !== null && 
    <Flex justify={'space-between'}>
      <Heading as='h3' size='lg' margin={'10px 0'}>{tiffinHeading}</Heading>
      <Button variant='outline' colorScheme='blue'>
        Add Menu
      </Button>
    </Flex>
    }

      {/* Tiffin Section */}

    {ActiveTiffins > 0 && <Heading as='h4' color={headingColor} size='md' margin={'15px 0'}>Active Menus</Heading>}

    <SimpleGrid columns={[1, 2, 3]} spacing='20px'>
      {
        tiffinAvailable && tiffins.length > 0 && 
        tiffins.map((tiffin) => {
          return tiffin.status && <TiffinCard key={tiffin._id} tiffin={tiffin} vender_id={user.vender_id} cart={''} bookedId={""}  buttonText={"Inactive"} updateStatus={updateStatus} />
        })
      }
    </SimpleGrid>

    {NonActiveTiffins > 0 && <Heading as='h4' color={headingColor} size='md' margin={'30px 0 15px 0'}>Not Active Menus</Heading>}

    <SimpleGrid columns={[1, 2, 3]} spacing='20px'>
      {
        tiffinAvailable && tiffins.length > 0 && 
        tiffins.map((tiffin) => {
          return !tiffin.status && <TiffinCard key={tiffin._id} tiffin={tiffin} vender_id={user.vender_id} cart={''} bookedId={""} buttonText={"Active"} updateStatus={updateStatus} />
        })
      }
    </SimpleGrid>

    </>
  )
}

export default Menu