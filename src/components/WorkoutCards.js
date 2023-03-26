import {
    Box,
    Stack,
    HStack,
    Text,
    VStack,
    List,
    ListItem,
    Button,
    Avatar
} from '@chakra-ui/react';

const users = [
    {
        workoutName: "Arm Shredder",
        creator: "Rich P",
        labels: ["Arms", "Biceps"]
    },
    {
        workoutName: "Back Day #5",
        creator: "Chris Bumsteed",
        labels: ["Lat", "Upper Back"]
    }
]

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

function Cards({ workoutName, creator, labels }) {
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

                    {// creator profile button
                    }
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
                py={4}
                borderBottomRadius={'xl'}>
                <List spacing={3} textAlign="center" px={12}>
                    {labels.map((label) => (
                        <ListItem>
                            {label}
                        </ListItem>
                    ))}
                </List>

                <Box w="80%" pt={7}>
                    <Button w="full" colorScheme="red" variant="outline">
                        View Workout
                    </Button>
                </Box>
            </VStack>

        </WorkoutWrapper>
    )
}

export default function WorkoutCards() {
    return (
        <Box py={12}>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                textAlign="center"
                justify="center"
                spacing={{ base: 4, lg: 10 }}
                py={10}>
                {users.map((user) => (
                    <Cards workoutName={user.workoutName} creator={user.creator} labels={user.labels} key={user.workoutName} />
                ))}
            </Stack>
        </Box>
    );
}