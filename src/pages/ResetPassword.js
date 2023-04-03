import { useState } from 'react';
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
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export default function ResetPassword() {
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
                    <Heading fontSize={'4xl'} color="white">Reset your resetPassword</Heading>
                    {passwordReset ?
                        <Text fontSize={'lg'} color={'green.400'}>
                            A password reset link has been sent to your email. <br />Check your email
                        </Text>

                        : <Text fontSize={'lg'} color={'red.400'}>
                            A password reset link will be sent to your email.
                        </Text>
                    }
                </Stack>

                <FormControl id="email" color="white" onChange={(e) => setEmail(e.target.value)}>
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

                <Link to="/signin">
                    <Text color="red.300">Back to sign-in</Text>
                </Link>
            </Stack>
        </Flex>
    );
}