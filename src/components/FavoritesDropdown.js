import {
    Box,
    Flex,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
} from '@chakra-ui/react';


export default function FavoritesDropdown() {
    return (
        <>
            <Box bg={useColorModeValue('none', 'none')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                        {//Code for dropdown menu button
                        }
                        <Flex alignItems={'center'}>
                            <Menu >
                                <MenuButton
                                    as={Button}
                                    cursor={'pointer'}
                                    label={'Sort By...'}
                                    >
                                    Sort By:
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Date Added (Newest)</MenuItem>
                                    <MenuDivider />
                                    <MenuItem>Date Added (Oldest)</MenuItem>
                                    <MenuDivider />
                                    <MenuItem>Creator</MenuItem>
                                    <MenuDivider />
                                    <MenuItem>Muscle Group</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                </Flex>
            </Box>
        </>
    );
}