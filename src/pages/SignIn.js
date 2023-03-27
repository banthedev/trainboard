import {
    Flex,
    Box,
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
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';

export default function SimpleCard() {
    return (

        <>
            <Navbar />
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={'white'}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                        /*this button is currently routed to signin, route to reset pw*/
                                    <Link to='/signin'><Button direction={{ base: 'column', sm: 'row' }} align={'center'} justify={'space-between'}>
                                        Forgot Password?
                                    </Button></Link>
                                </Stack>
                                <Link to='/signup'><Button direction={{ base: 'column', sm: 'row' }} align={'center'} justify={'space-between'}>
                                        Don't have an account yet? Sign Up
                                    </Button></Link>
                                <Button
                                    bg={'red.500'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'red.600',
                                    }}>
                                    Sign In
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}