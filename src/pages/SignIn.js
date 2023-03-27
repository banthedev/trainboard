import { useState } from 'react';
import {
    Flex,
    Image,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export default function SimpleCard() {
    // Email & Pass
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Error state
    const [error, setError] = useState('');
    // Router-dom
    const navigate = useNavigate();
    // Sign-in Hook
    const { signIn } = UserAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('')
        try {
            await signIn(email, password)
            navigate('/dashboard')
        } catch (e) {
            setError(e.message)
            console.log(error)
        }
    };
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Image src="trainboard_full.png" w="300px" />
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Start your journey <Link color={'red.400'}>today</Link>
                    </Text>
                </Stack>
                <form p={8} onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl id="email" onChange={(e) => setEmail(e.target.value)}>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" />
                        </FormControl>
                        <FormControl id="password" onChange={(e) => setPassword(e.target.value)}>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'red.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                type="submit"
                                bg={'red.500'}
                                color={'white'}
                                _hover={{
                                    bg: 'red.600',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                        <Text>Don't have an account? <Link color={'red.400'} to="/signup">Create one</Link></Text>
                    </Stack>
                </form>
            </Stack>
        </Flex>
    );
}