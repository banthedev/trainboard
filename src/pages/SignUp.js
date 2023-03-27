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
           return setError("Passwords do not match :(");
       }

       try {
           setError('');
           setLoading(true);
           await createUser(email, password);
           navigate('/dashboard')
       } catch (e) {
           setError("Failed to create an account");
           console.log(e.message);
       }
       setLoading(false);
   };
    return (
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Image src="trainboard_full.png" w="300px" />
                <Heading fontSize={'4xl'}>Sign up for TrainBoard</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    Workouts That Work for You
                </Text>
                {error &&
                        <Text
                            className='text-lg text-rose-500 text-center'
                        >
                            {error}
                        </Text>
                    }
            </Stack>
            <form onSubmit={handleSubmit}
                p={8}>
                <Stack spacing={4}>
                    <FormControl id="email" onChange={(e) => setEmail(e.target.value)}>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" />
                    </FormControl>
                    <FormControl id="password" onChange={(e) => setPassword(e.target.value)}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" />
                    </FormControl>
                    <FormControl id="passwordConfirm" onChange={(e) => setConfirmationPassword(e.target.value)}>
                        <FormLabel>Password Confirmation</FormLabel>
                        <Input type="password" />
                    </FormControl>
                    <Stack spacing={10}>
                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'center'}
                            justify={'space-between'}>
                            <Link color={'blue.400'} to='/signin'>Already have an account? Sign in</Link>
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
                    </Stack>
                </Stack>
            </form>
        </Stack>
    </Flex>    
    )
}

