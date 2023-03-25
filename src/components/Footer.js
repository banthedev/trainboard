import {
    Box,
    Center,
    chakra,
    Container,
    Link,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
    Image
} from '@chakra-ui/react';




export default function Footer() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                spacing={4}
                justify={'center'}
                align={'center'}>
                <Image src="trainboard_full.png" w="150px" />
                <Stack direction={'row'} spacing={6}>
                    <Link href={'#'}>Home</Link>
                    <Link href={'#'}>About</Link>
                    <Link href={'#'}>Blog</Link>
                    <Link href={'#'}>Contact</Link>
                </Stack>
                <Text color={'gray'}>Est. 2023</Text>
            </Container>
        </Box>
    );
}
