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
    Image,
    Heading
} from '@chakra-ui/react';
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

export default function Explore() {
    const { resetPassword } = UserAuth();
    // Email and Password reset states
    const [email, setEmail] = useState('');
    const [passwordReset, setPasswordReset] = useState(false);

    async function handlePasswordReset() {
        try {
            await resetPassword(email);
            setPasswordReset(true);
            setTimeout(() => {
                setPasswordReset(false);
            }, 10000);
        } catch (e) {
            console.log(e.message);
        }
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
                    maxW={'500px'}
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
                               Enter your email to reset your password, within the email you will be prompted to change your website.
                            </Text>
                        </Stack>
                    </Stack>
                    {passwordReset ?
                        <Text fontSize={'lg'} color={'green.400'}>
                            A password reset link has been sent to your email. <br />Check your email
                        </Text>

                        : <Text fontSize={'lg'} color={'red.400'}>
                            A password reset link will be sent to your email.
                        </Text>
                    }
                    {/*ADD EDIT FUNCTIONALITY TO BUTTONS*/}
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>

                        <FormControl id="email" color="black" onChange={(e) => setEmail(e.target.value)}>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" />
                        </FormControl>
                        {passwordReset ?
                            <Button
                                bg={'green.500'}
                                color={'white'}
                                _hover={{
                                    bg: 'green.600',
                                }}
                                onClick={handlePasswordReset}
                            >
                                Link Sent
                            </Button>
                            :
                            <Button
                                bg={'red.500'}
                                color={'white'}
                                _hover={{
                                    bg: 'red.600',
                                }}
                                onClick={handlePasswordReset}
                            >
                                Reset Password
                            </Button>

                        }

                        <Link to="/profile">
                            <Text color="red.300">Back</Text>
                        </Link>
                    </Stack>
                </Box>
            </Center>
        </div>


    )
}
