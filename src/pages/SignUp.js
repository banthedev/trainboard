import React, { useState } from 'react';
import {
    Flex,
    Image,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    Highlight,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export default function SignUp() {
    // Error state
    const [error, setError] = useState('');
    // Email & Pass state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    // Loading State, disabling button when calling the firebase hook
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    // Create user hook
    const { createUser } = UserAuth();

    async function handleSubmit(e) {
        // Prevent Page Reload
        e.preventDefault();

        // Make sure password and confirmation password are the same
        if (password !== confirmationPassword) {
            return setError("Error: passwords do not match");
        }

        try {
            setError('');
            setLoading(true);
            await createUser(email, password);
            navigate('/dashboard')
        } catch (e) {
            setError("Error: failed to create an account");
            console.log(e.message);
        }
        setLoading(false);
    };
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            backgroundImage={
                'red_background.jpg'
            }
            backgroundSize={'cover'}
            backgroundPosition={'center center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Image src="trainboard_full.png" w="300px" />
                    <Heading fontSize={'4xl'} color="white">Sign up for TrainBoard</Heading>
                    <Text fontSize={'lg'} color={'red.400'}>
                        Workouts That Work for You
                    </Text>
                    {error &&
                        <Highlight
                            query={error}
                            styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.300' }}
                        >
                            {error}
                        </Highlight>
                    }
                </Stack>
                <form onSubmit={handleSubmit}
                    p={8}>
                    <Stack spacing={4} color="white">
                        <FormControl id="email" onChange={(e) => setEmail(e.target.value)} isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" />
                        </FormControl>
                        <FormControl id="password" onChange={(e) => setPassword(e.target.value)} isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" />
                        </FormControl>
                        <FormControl id="passwordConfirm" onChange={(e) => setConfirmationPassword(e.target.value)} isRequired>
                            <FormLabel>Password Confirmation</FormLabel>
                            <Input type="password" />
                        </FormControl>
                        <Stack spacing={8}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'center'}
                                justify={'space-between'}>
                                <Text>Already have an account? <Link style={{ color: "#E53E3E" }} to="/signin">Sign in</Link></Text>
                            </Stack>
                            <Button
                                type="submit"
                                bg={'red.500'}
                                color={'white'}
                                disabled={loading}
                                _hover={{
                                    bg: 'red.600',
                                }}>
                                Sign Up
                            </Button>
                            <Link to="/">
                                <Text color="red.300">Go back home</Text>
                            </Link>
                        </Stack>
                    </Stack>
                </form>
            </Stack>
        </Flex>
    )
}

