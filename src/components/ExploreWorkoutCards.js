import {
    Box,
    Tag,
    HStack,
    Text,
    VStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon, ExternalLinkIcon, StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { updateFavoriteWorkout, addFavoriteWorkoutToUserDocument, removeFavoriteWorkoutFromUserDocument } from '../context/StoreContext';

function WorkoutWrapper({ children, wasDeleted }) {
    if (!wasDeleted) {
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
    } else {
        return null;
    }
}

export default function ExploreWorkoutCard({ user, workoutName, creator, isPrivate, workoutId, createdAt, isFavorite }) {
    // React State
    const [isFavorited, setIsFavorited] = useState(isFavorite);
    // Convert Date to String
    const date = createdAt.toDate().toDateString();

    async function handleFavoriteWorkout() {
        try {
            setIsFavorited(!isFavorited);
            if (!isFavorited) {
                await addFavoriteWorkoutToUserDocument(user, workoutId);
            } else {
                await removeFavoriteWorkoutFromUserDocument(user, workoutId);
            }
        } catch (error) {
            console.error("Unable to favorite workout: " + error);
        }
    }

    // Get workout link
    const workoutLink = `https://trainboard.vercel.app/workouts/${workoutId}`;

    return (
        <WorkoutWrapper>
            <Box py={"4px"} >
                <HStack justifyContent="center">
                    {isFavorited ?
                        <StarIcon w={4} h={8} color="yellow.400" onClick={handleFavoriteWorkout} />
                        :
                        <StarIcon w={4} h={8} color="gray.900" onClick={handleFavoriteWorkout} />
                    }
                    <Text fontWeight="500" fontSize="xl" >
                        {workoutName}
                    </Text>

                    {/* Workout Properties Menu */}
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            variant='outline'
                        />
                        <MenuList>
                            <MenuItem icon={<ExternalLinkIcon />} onClick={() => { navigator.clipboard.writeText(workoutLink) }}>
                                Share Workout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>

            </Box>
            {/* Portion for labels */}
            <VStack
                bg={'white'}
                py={1}
                borderBottomRadius={'xl'}>
                <p>@{creator}</p>
                <p><b>Created:</b><br />{date} </p>
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
