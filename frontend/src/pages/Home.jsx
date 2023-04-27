import { Heading, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TiffinCard from '../components/TiffinCard';
import VenderCard from '../components/VenderCard';
import { getCart, getProfile, getTiffins, getVenders, updateProfile } from '../Redux/AppReducer/action';
import TiffinCardSkeleton from '../skeleons/TiffinCardSkeleton';

const Home = () => {

  const dispatch = useDispatch();
  const {user, venders, tiffins} = useSelector((store) => (
    {
      user : store.AppReducer.user,
      venders : store.AppReducer.venders,
      tiffins : store.AppReducer.tiffin
    }
  ));
  const [showVenders, setShowVenders] = useState(null);
  const navigate = useNavigate();
  const cart = useSelector((store) => store.OrderReducer.cart);
  const [bookedId, setBookedId] = useState([]);
  const [tiffinHeading, setTiffinHeading] = useState((tiffins.length > 0) ? "Today's Menu" : "");
    
  useEffect(() => {
    if(cart.length == 0)
      dispatch(getCart())
    
    if(cart.length != 0) {
      const temp = cart
                    .map((item) => item.tiffin_id);
      setBookedId(temp);
    }

  }, [cart.length])

  useEffect(() => {
      if(Object.keys(user).length !== 0 ) {
        if(user?.vender_id)
          setShowVenders(false);
        else
          setShowVenders(true);
      }

      if(!user)
        dispatch(getProfile())

  }, [user])

  useEffect(() => {
    if(venders.length === 0)
      dispatch(getVenders())
    
    if(tiffins.length === 0) {
      dispatch(getTiffins(user?.vender_id))
      .then((res) => {
        if(res?.type === "TIFFIN_SUCCESS") {
          (res?.payload.length > 0) ? 
            setTiffinHeading("Today's Menu") : 
            setTiffinHeading("Tiffin Provider doesn't have any Menu");
        }
      })
    }

}, [venders.length, tiffins.length, user?.vender_id])

  console.log(tiffins);

  const subscribe = (vender_id) => {
    if(isProfileComplete()) {
      alert(vender_id);
      dispatch(updateProfile({vender_id}))
      .then((res) => {
        if(res?.type == 'USER_SUCCESS')
          setShowVenders(false);
      } )
      .catch((err) => console.log(err))
    }
    else {
      alert("complete you profile first");
      navigate('/profile');
    }
  }

  const isProfileComplete = () => {
    if(user.name && user.email && user.mobile && user.room_no && user.address && user.pg_id)
      return true;
    return false;
  }
  

  return (
    <> 
    {
      (showVenders === null || (showVenders === false && tiffinHeading === "")) && 
        <TiffinCardSkeleton />
    }

    {showVenders === true && <Heading as='h3' size='lg' margin={'10px 0'}>Please Select any Tiffin Provider to go further</Heading>}
    {showVenders === false && <Heading as='h3' size='lg' margin={'10px 0'}>{tiffinHeading}</Heading>}
      
      {/* Vender Section */}
      
      <SimpleGrid columns={[1, 2, 2, 2, 3]} spacing='40px' mt={'30px'}>
      {
        showVenders === true && venders.length > 0 && 
        venders.map((vender) => {
          return <VenderCard key={vender._id} vender={vender} subscribe={subscribe} selectedVender={""} />
        })
      }
      </SimpleGrid>

      {/* Tiffin Section */}

      <SimpleGrid columns={[1, 2, 2, 2, 3]} spacing='20px'>
      {
        showVenders === false && tiffins.length > 0 && 
        tiffins.map((tiffin) => {
          return tiffin.status && <TiffinCard key={tiffin._id} tiffin={tiffin} vender_id={user.vender_id} cart={cart} bookedId={bookedId}  buttonText={""} updateStatus={""} />
        })
      }
    </SimpleGrid>
    </>
  )
}

export default Home