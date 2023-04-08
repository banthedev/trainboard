import {
    Box,
    Tag,
    HStack,
    Text,
    VStack,
    Button,
    Avatar,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink'];
var textColors = ['black', 'white', 'white', 'black', 'black', 'black'];
var muscles = ["ARMS", "CHEST", "BACK", "LEGS", "SHOULDERS", "CARDIO"];

function WorkoutWrapper({ children }) {
    return (
        <Box
            mb={4}
            shadow="base"
            borderWidth="1px"
            alignSelf={{ base: 'center', lg: 'flex-start' }}
            borderColor={'black'}
            borderRadius={'xl'}
            backgroundColor={'white'}
            borderBottom={' "3px solid black'}>
            {children}
        </Box>
    );
}

export default function WorkoutCard({ workoutName, creator, isPrivate, workoutId, createdAt }) {
    const date = createdAt.toDate().toDateString();

    return (
        <WorkoutWrapper>
            <Box py={4} px={12}>
                {/* Workout Name */}
                <Text fontWeight="500" fontSize="xl">
                    {workoutName}
                </Text>

                {/* Workout Creator */}
                <HStack justifyContent="center">
                    <Text fontSize="l" fontWeight="600">
                        {creator}
                    </Text>

                    <Button
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}>
                        <Avatar
                            size={'sm'}
                            src={
                                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                            }
                        />
                    </Button>
                </HStack>
            </Box>

            {/* Portion for labels */}
            <VStack
                bg={'white'}
                py={1}
                borderBottomRadius={'xl'}>
                <p><b>Created:</b><br />{date} </p>

                <HStack spacing={3} textAlign="center" px={12} pt={3} >
                    {isPrivate ?
                        <Tag size="md" variant='subtle' colorScheme='red'>
                            Private
                        </Tag>
                        :
                        <Tag size="md" variant='subtle' colorScheme='cyan'>
                            Public
                        </Tag>
                    }
                </HStack>
                <Box w="80%" pt={3} pb={3}>
                    <Link to={`/workouts/${workoutId}`}>
                        <Button w="full" colorScheme="red" variant="outline">
                            View Workout
                        </Button>
                    </Link>
                </Box>
            </VStack>

        </WorkoutWrapper>
    )
}
