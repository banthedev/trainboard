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


export default function WorkoutInfo() {
    return (
        <Box py={12}>
            <VStack
                textAlign="center"
                justify="center">
                <Text marginBottom="0" fontSize="xl" fontWeight="bold" as="u">{tempworkout.workoutName}</Text>
                <HStack marginTop="0">
                    <Text>{"By: "+tempworkout.creator}</Text>
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

                {/* muscle group tags */}
                <HStack spacing={3} textAlign="center" px={12}>
                    {tempworkout.labels.map((label) => (
                            <text style={{backgroundColor:colors[label], color:textColors[label], borderRadius:20, padding:5}} >
                                {muscles[label]}
                            </text>
                    ))}
                </HStack>
            </VStack>
        </Box>
    );
}