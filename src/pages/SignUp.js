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
export default function SignIn() {

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
                        <Heading fontSize={'4xl'}>Sign up for TrainBoard</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            Workouts That Work for You
                        </Text>
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
                            <FormControl id="username">
                                <FormLabel>Username</FormLabel>
                                <Input type="username" />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" />
                            </FormControl>
                            <FormControl id="confirmpassword">
                                <FormLabel>Confirm Password</FormLabel>
                                <Input type="confirmpassword" />
                            </FormControl>
                            <Stack spacing={10}>
                                <Link to='/signin'><Button direction={{ base: 'column', sm: 'row' }} align={'center'} justify={'space-between'}>
                                    Already have an account? Sign in
                                </Button></Link>
                                <Button
                                    bg={'red.500'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'red.600',
                                    }}>
                                    Sign Up
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>

        </>
    );
}
