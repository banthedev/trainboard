import {
    Box,
    Flex,
    HStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
} from '@chakra-ui/react';

const categories = [
    {
        label: 'Trending',
    },
    {
        label: 'Recently Uploaded',
    }
];

export default function Navbar() {

    return (
        <>
            <Box bg={useColorModeValue('none', 'none')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    {//Code for normal menu buttons
                    }
                    <HStack alignItems={'center'}>
                        <HStack
                            as={'nav'}
                            display={{ base: 'none', md: 'flex' }}>
                            {categories.map((name) => (
                                <Button
                                    px={2}
                                    py={1}
                                    rounded={'md'}
                                    color={'black'}
                                    _hover={{
                                        textDecoration: 'none',
                                        bg: 'red.500'
                                    }}
                                    key={name.label}>
                                    {name.label}
                                </Button>
                            ))}
                        </HStack>
                        {//Code for dropdown menu button
                        }
                        <Flex alignItems={'center'}>
                            <Menu >
                                <MenuButton
                                    as={Button}
                                    cursor={'pointer'}
                                    label={'Muscle Group...'}
                                    >
                                    Muscle Group
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Arms</MenuItem>
                                    <MenuDivider />
                                    <MenuItem>Chest</MenuItem>
                                    <MenuDivider />
                                    <MenuItem>Back</MenuItem>
                                    <MenuDivider />
                                    <MenuItem>Legs</MenuItem>
                                    <MenuDivider />
                                    <MenuItem>Shoulders</MenuItem>
                                    <MenuDivider />
                                    <MenuItem>Cardio</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                    </HStack>
                </Flex>
            </Box>
        </>
    );
}