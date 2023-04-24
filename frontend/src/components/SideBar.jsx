import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  useColorMode,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { ReactText, Link as ReactLink} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../Redux/AppReducer/action';
import { Link as RouterLink } from 'react-router-dom';

// interface LinkItemProps {
//   name: string;
//   icon: IconType;
// }

export default function SideBar ({children}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

// interface SidebarProps extends BoxProps {
//   onClose: () => void;
// }

const SidebarContent = ({ onClose, ...rest }) => {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.AppReducer.user);
  const [LinkItems, setLinkItems] = useState([
    { name: 'Home', icon: FiHome, href: '/' },
    { name: 'Profile', icon: FiTrendingUp, href: '/profile' },
    { name: 'Cart', icon: FiCompass, href: '/cart'  },
    { name: 'Order History', icon: FiStar, href: '/orders' },
    { name: 'Tiffin Providers', icon: FiSettings, href: '/tiffin-providers' },
  ]);

  useEffect(() => {
    console.log("WORKING SIDE BAR AGAIN AGINA |||||||||||||||||||||||||||||||||||||| ",Object.keys(user).length);
    console.log(user);
    if(Object.keys(user).length === 0) {
      console.log("WORKING SIDE BAR AGAIN AGINA &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      dispatch(getProfile())
      .then((res) => {
        if(res.type === "USER_SUCCESS" && res?.payload?.role === "vender") {
          setLinkItems([
            { name: 'Home', icon: FiHome, href: '/' },
            { name: 'Profile', icon: FiTrendingUp, href: '/profile' },
            { name: 'Menu', icon: FiCompass, href: '/menu'  },
            { name: 'Customers', icon: FiStar, href: '/customers' },
            { name: 'PG', icon: FiSettings, href: '/pg' },
            { name: 'Order History', icon: FiCompass, href: '/orders' },
          ])
        }
      })
    }
  }, [Object.keys(user).length])

  // useEffect(() => {
  //   console.log(LinkItems);
  //   console.log("WORKING SIDE BAR AGAIN AGINA ========================================");
  //   if(user.role === "customer") {
  //     setLinkItems([
  //       { name: 'Home', icon: FiHome, href: '/' },
  //       { name: 'Profile', icon: FiTrendingUp, href: '/profile' },
  //       { name: 'Cart', icon: FiCompass, href: '/cart'  },
  //       { name: 'Order History', icon: FiStar, href: '/orders' },
  //       { name: 'Tiffin Providers', icon: FiSettings, href: '/tiffin-providers' },
  //     ])
  //   }
  //   else if(user.role === "vender") {
  //     setLinkItems([
  //       { name: 'Home', icon: FiHome, href: '/' },
  //       { name: 'Profile', icon: FiTrendingUp, href: '/profile' },
  //       { name: 'Menu', icon: FiCompass, href: '/menu'  },
  //       { name: 'Customers', icon: FiStar, href: '/customers' },
  //       { name: 'PG', icon: FiSettings, href: '/pg' },
  //       { name: 'Order History', icon: FiCompass, href: '/orders' },
  //     ])
  //   }
  // }, [user.role]);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem href={link?.href || '#'} key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

// interface NavItemProps extends FlexProps {
//   icon: IconType;
//   children: ReactText;
// }
const NavItem = ({ href, icon, children, ...rest }) => {
  return (
    <Link as={RouterLink} to={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

// interface MobileProps extends FlexProps {
//   onOpen: () => void;
// }
const MobileNav = ({ onOpen, ...rest }) => {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useSelector((store) => store.AppReducer.user);

  
  useEffect(() => {
    if(Object.keys(user).length === 0 )
      dispatch(getProfile())
  }, [Object.keys(user).length])

  const logoutUser = () => {
    localStorage.removeItem('loginToken');
    window.location.href = '/';
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  name={user?.name}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{user?.name}</Text>
                  {/* <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text> */}
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              {/* <MenuDivider /> */}
              <MenuItem onClick={logoutUser}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};