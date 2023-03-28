//import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Background from "../components/Background";
import ExploreNav from "../components/ExploreNav";
import WorkoutCards from "../components/WorkoutCards";
import { Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
import { UserAuth } from "../context/AuthContext";


export default function Explore() {

    const { user } = UserAuth();
    
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
              My Profile
            </Text>
            <Text fontSize={'xl'} fontWeight={800}>
              - Settings -
            </Text>
          </Stack>
        </Stack>
        {/*ADD EDIT FUNCTIONALITY TO BUTTONS*/}
        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
          <List spacing={3}>
            <ListItem>
              
              Username: display here
              <Button>Edit</Button>
            </ListItem>
            <ListItem>
              
              Email: {user.email}
              <Button>Edit</Button>
            </ListItem>
          </List>

          <Link to='/changepassword'><Button
            mt={10}
            w={'full'}
            bg={'gray.600'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
            _hover={{
              bg: 'gray.500',
            }}
            _focus={{
              bg: 'gray.600',
            }}>
            Change Password
          </Button></Link>
          <Link to='/deleteaccount'><Button
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
            Delete Account
          </Button></Link>
        </Box>
      </Box>
    </Center>
        </div>

        
    )
}

