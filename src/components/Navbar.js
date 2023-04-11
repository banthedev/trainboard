import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Image,
    Text
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { UserAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
const Links = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'About Us',
        href: '/aboutus',
    }
];

const AuthLinks = [
    {
        label: 'Dashboard',
        href: '/dashboard',
    },
    {
        label: 'Favorite Workouts',
        href: '/favoriteworkouts',
    },
    {
        label: 'My Workouts',
        href: '/myworkouts',
    },
    {
        label: 'Explore',
        href: '/explore',
    }
]

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate('/');
            console.error("You are logged out")
        } catch (e) {
            console.error(e.message);
        }
    }

    let userLinks = [];
    if (user) {
        userLinks = AuthLinks;
    } else {
        userLinks = Links;
    }
    return (
        <>
            <Box bg={useColorModeValue('black', 'white')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        bg="none"
                        color="white"
                        _hover={{
                            color: "black",
                            bg: "red.500"
                        }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box w="50px">
                            <Image
                                src="trainboard_icon.png"
                                alt="TrainBoard"
                            />
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {userLinks.map((link) => (
                                <Link to={link.href}
                                    key={link.label}
                                >
                                    <Text
                                        px={2}
                                        py={1}
                                        rounded={'md'}
                                        color={'white'}
                                        _hover={{
                                            textDecoration: 'none',
                                            bg: 'red.500'
                                        }}
                                    >
                                        {link.label}
                                    </Text>
                                </Link>
                            ))}
                            {user &&
                                <Link to="/create">
                                    <Button
                                        leftIcon={<PlusSquareIcon />}
                                        size="sm"
                                        colorScheme='red'
                                    >
                                        Create Workout
                                    </Button>
                                </Link>
                            }
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        {user ?
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={
                                            'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                        }
                                    />
                                </MenuButton>
                                <MenuList>
                                    <Link to='/profile'><MenuItem>Profile</MenuItem></Link>
                                    <MenuDivider />
                                    <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                                </MenuList>
                            </Menu>
                            :
                            <Menu>
                                <Link to="/signin">
                                    <Text
                                        px={2}
                                        py={1}
                                        rounded={'md'}
                                        color={'white'}
                                        bg="red.500"
                                        _hover={{
                                            textDecoration: 'none',
                                            bg: 'red.600'
                                        }}
                                    >
                                        Login
                                    </Text>
                                </Link>
                            </Menu>
                        }
                    </Flex>
                </Flex>
                {/* Hamburger for smaller devices */}
                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {userLinks.map((link) => (
                                <Link to={link.href}>
                                    <Text
                                        px={2}
                                        py={1}
                                        rounded={'md'}
                                        color={'white'}
                                        _hover={{
                                            textDecoration: 'none',
                                            bg: 'red.500'
                                        }}
                                        key={link.label}
                                        href={link.href}>
                                        {link.label}
                                    </Text>
                                </Link>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
