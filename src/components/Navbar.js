import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
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
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Explore',
        href: '/explore',
    },
    {
        label: 'Create',
        href: '/create',
    }
];

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                            {Links.map((link) => (
                                <Link
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
                                </Link>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
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
                                <MenuItem>Profile</MenuItem>
                                <MenuDivider />
                                <MenuItem>Sign Out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <Link
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
                                </Link>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

        </>
    );
}
