import { Heading, SimpleGrid, Skeleton, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VenderCard from '../components/VenderCard';
import { getProfile, getVenders, updateProfile } from '../Redux/AppReducer/action';

const Providers = () => {

  const dispatch = useDispatch();
  const {user, venders} = useSelector((store) => (
    {
      user : store.AppReducer.user,
      venders : store.AppReducer.venders
    }
  ));
  const [showVenders, setShowVenders] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if(!user)
        dispatch(getProfile())

    if(venders.length === 0)
        dispatch(getVenders())

    if(venders.length > 0)
        setShowVenders(true);

  }, [user, venders.length])

  // console.log(tiffins);

  const subscribe = (vender_id) => {
    if(isProfileComplete()) {
      dispatch(updateProfile({vender_id}))
      .then((res) => {
        if(res?.type == 'USER_SUCCESS')
          alert('Tiffin Provider Subscribed')
          window.location.href = "/";
      } )
      .catch((err) => console.log(err))
    }
    else {
      alert("complete you profile first");
      navigate('/profile');
    }
  }

  const unsubscribe = (vender_id) => {
    dispatch(updateProfile({vender_id : ""}))
    .then((res) => {
      if(res?.type == 'USER_SUCCESS')
        alert("Provider Unsubscribed");
    })
    .catch((err) => console.log(err))
  }

  // console.log(user);

  const isProfileComplete = () => {
    if(user.name && user.email && user.mobile && user.room_no && user.address && user.pg_id)
      return true;
    return false;
  }
  

  return (
    <> 
    {
      !showVenders && 
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
    {showVenders && <Heading as='h3' size='lg' margin={'10px 0'}>Tiffin Providers</Heading>}
      
      {/* Vender Section */}
      
      <SimpleGrid columns={[1, 2, 2]} spacing='40px' mt={'30px'}>
      {
        showVenders && venders.length > 0 && 
        venders.map((vender) => {
          return <VenderCard key={vender._id} vender={vender} subscribe={(vender._id === user.vender_id) ? unsubscribe : subscribe} selectedVender={user.vender_id} />
        })
      }
      </SimpleGrid>
    </>
  )
}

export default Providers