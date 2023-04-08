import {
    Box,
    Stack,
    HStack,
    Text,
    Button,
    Avatar,
    Link,
    VStack
} from '@chakra-ui/react';

class workout {
        workoutName="Arm Shredder";
        creator="Rich P";
        labels=["0"];
}

// will need to get workout from database eventually
var tempworkout = new workout();

var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink'];
var textColors = ['black', 'white', 'white', 'black', 'black', 'black'];
var muscles =["ARMS", "CHEST", "BACK", "LEGS", "SHOULDERS", "CARDIO"];


export default function WorkoutInfo({creator, workoutName, createdAt, isPrivate}) {
    return (
        <Box py={12}>
            <VStack
                textAlign="center"
                justify="center">
                <Text marginBottom="0" fontSize="xl" fontWeight="bold" as="u">{workoutName}</Text>
                <HStack marginTop="0">
                    <Text>{"By: " + creator}</Text>
                    <Button
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}>
                    </Button>
                </HStack>

                {/* muscle group tags
                <HStack spacing={3} textAlign="center" px={12}>
                    {tempworkout.labels.map((label) => (
                            <text style={{backgroundColor:colors[label], color:textColors[label], borderRadius:20, padding:5}} >
                                {muscles[label]}
                            </text>
                    ))}
                </HStack> */}
            </VStack>
        </Box>
    );
}