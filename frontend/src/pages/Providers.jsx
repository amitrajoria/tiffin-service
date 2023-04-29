import { Heading, SimpleGrid, Skeleton, Stack, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VenderCard from '../components/VenderCard';
import { getProfile, getVenders, updateProfile } from '../Redux/AppReducer/action';
import ProvidersSkeleton from '../skeleons/ProvidersSkeleton';

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
  const toast = useToast();


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
      .catch((err) => {
        console.log(err)
        toast({
          title: err?.payload,
          position: 'top-right',
          isClosable: true,
          status: 'error' 
        })
      })
    }
    else {
      alert("complete you profile first");
      navigate('/profile');
    }
  }

  const unsubscribe = (vender_id) => {
    dispatch(updateProfile({vender_id : ""}))
    .then((res) => {
      if(res?.type == 'USER_SUCCESS') {
        toast({
          title: "Provider Unsubscribed",
          position: 'top-right',
          isClosable: true,
          status: 'success' 
        })
      }
    })
    .catch((err) => {
      console.log(err)
      toast({
        title: err?.payload,
        position: 'top-right',
        isClosable: true,
        status: 'error' 
      })
    })
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
      !showVenders && <ProvidersSkeleton />
    }
    {showVenders && <Heading as='h3' size='lg' margin={'10px 0'}>Tiffin Providers</Heading>}
      
      {/* Vender Section */}
      
      <SimpleGrid columns={[1, 1, 2]} spacing='40px' mt={'30px'}>
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