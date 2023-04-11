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
    Highlight,
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
            if (e.message === "Firebase: Error (auth/wrong-password).") {
                setError("Password is incorrect. Please try again.");
            } else if ("Firebase: Error (auth/user-not-found).") {
                setError("Email does not exist. Please sign up.");
            } else {
                setError("Error: failed to login");
            }
            console.error(e.message);
        }
    };
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            w={'full'}
            backgroundImage={
                'red_background.jpg'
            }
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Image src="trainboard_full.png" w="300px" />
                    <Heading fontSize={'4xl'} color="white">Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'red.400'}>
                        Start your journey today
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
                <form p={8} onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl id="email" color="white" onChange={(e) => setEmail(e.target.value)}>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" />
                        </FormControl>
                        <FormControl id="password" color="white" onChange={(e) => setPassword(e.target.value)}>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}
                                color="white"
                            >
                                <Checkbox>Remember me</Checkbox>
                                <Link to="/reset-password">Forgot password?</Link>
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
                        <Text color="white">Don't have an account? <Link to="/signup" style={{ color: "#EB5F5F" }}>Create one</Link></Text>
                        <Link to="/">
                            <Text color="red.300">Go back home</Text>
                        </Link>
                    </Stack>
                </form>
            </Stack>
        </Flex>
    );
}