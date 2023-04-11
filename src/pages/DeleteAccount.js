//import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Background from "../components/Background";
import ExploreNav from "../components/ExploreNav";
import WorkoutCards from "../components/WorkoutCards";
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from "../context/AuthContext";
import {
    Box,
    Center,
    Text,
    List,
    ListItem,
    ListIcon,
    useColorModeValue,
    Flex,
    Image,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Highlight,
    Stack
} from '@chakra-ui/react';
import { deleteUserDocument } from "../context/StoreContext";
export default function Explore() {
    const navigate = useNavigate();
    const {user, deleteAccount} = UserAuth(); 
    async function handleDeleteAccount() {
        await deleteAccount();
        navigate("/");
        deleteUserDocument(user); 
    }
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
                                DELETE ACCOUNT
                            </Text>
                            <Text fontSize={'xl'} fontWeight={800}>
                                Please enter your username to permanently delete your account
                            </Text>
                        </Stack>
                    </Stack>
                    {/*ADD EDIT FUNCTIONALITY TO BUTTONS*/}
                    <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input type="username" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Confirm Username</FormLabel>
                            <Input type="username" />
                        </FormControl>

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
                            Go back
                        </Button></Link>

                            {/*LINK THIS TO LANDING PAGE ONCE ACCOUNT IS DELETED*/}
                        <Button
                            onClick={handleDeleteAccount}
                            mt={10}
                            w={'full'}
                            bg={'red.600'}
                            color={'white'}
                            rounded={'xl'}
                            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                            _hover={{
                                bg: 'red.500',
                            }}
                            _focus={{
                                bg: 'red.600',
                            }}>
                            Delete account
                        </Button>
                    </Box>
                </Box>
            </Center>
        </div>


    )
}
