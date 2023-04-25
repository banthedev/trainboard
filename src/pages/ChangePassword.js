//import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import { Link } from 'react-router-dom';
import {
    Box,
    Center,
    Text,
    useColorModeValue,
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    Image
} from '@chakra-ui/react';

export default function Explore() {
    return (
        <div>
            <Background />
            <Navbar />
            <div id="explorecontentdiv">
                <style>
                    {'#explorecontentdiv { background-color:rgba(20,20,20,0.6); margin-top:1%; display:inline-block; width:90%; }'}
                </style>
            </div>

            <Center py={6}>
                <Box
                    maxW={'330px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    overflow={'hidden'}>
                    <Stack
                        textAlign={'center'}
                        p={6}
                        color={useColorModeValue('gray.800', 'white')}
                        align={'center'}>
                        <Stack direction={'column'} align={'center'} justify={'center'}>
                            <Text fontSize={'3xl'} fontWeight={800}>
                                Change Password
                            </Text>
                            <Text fontSize={'xl'} fontWeight={800}>
                                Please enter your old password and then confirm your new password, click save to save and return to profile
                            </Text>
                        </Stack>
                    </Stack>
                    {/*ADD EDIT FUNCTIONALITY TO BUTTONS*/}
                    <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                        <FormControl id="old_password">
                            <FormLabel>Old Password</FormLabel>
                            <Input type="password" />
                        </FormControl>
                        <FormControl id="new_password">
                            <FormLabel>New Password</FormLabel>
                            <Input type="password" />
                        </FormControl>
                        <FormControl id="confirm_new_password">
                            <FormLabel>Confirm New Password</FormLabel>
                            <Input type="password" />
                        </FormControl>

                        <Link to='/profile'><Button
                            mt={10}
                            w={'full'}
                            bg={'gray.600'}
                            color={'white'}
                            rounded={'xl'}
                            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                            _hover={{
                                bg: 'gray.500',
                            }}
                            _focus={{
                                bg: 'gray.600',
                            }}>
                            Go back
                        </Button></Link>

                            {/*save new password and return to profile*/}
                        <Link to='/profile'><Button
                            mt={10}
                            w={'full'}
                            bg={'green.600'}
                            color={'white'}
                            rounded={'xl'}
                            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                            _hover={{
                                bg: 'green.500',
                            }}
                            _focus={{
                                bg: 'green.600',
                            }}>
                            Save
                        </Button></Link>
                    </Box>
                </Box>
            </Center>
        </div>


    )
}
