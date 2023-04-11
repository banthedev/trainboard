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
import { HamburgerIcon, ExternalLinkIcon, DeleteIcon, StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { deleteWorkoutFromCollecton } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { updateFavoriteWorkout, addFavoriteWorkoutToUserDocument, removeFavoriteWorkoutFromUserDocument } from '../context/StoreContext';

var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink'];
var textColors = ['black', 'white', 'white', 'black', 'black', 'black'];
var muscles = ["ARMS", "CHEST", "BACK", "LEGS", "SHOULDERS", "CARDIO"];

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

export default function WorkoutCard({ user, workoutName, creator, isPrivate, workoutId, createdAt, isFavorite }) {
    // React State
    const [wasDeleted, setWasDeleted] = useState(false);
    const [isFavorited, setIsFavorited] = useState(isFavorite);
    // Convert Date to String
    const date = createdAt.toDate().toDateString();
    // Delete Workout
    const navigate = useNavigate();
    async function handleDeleteWorkout() {
        try {
            await deleteWorkoutFromCollecton(user, workoutName, isPrivate);
            setWasDeleted(true);
            setTimeout(() => {
                //navigate('/dashboard');
                window.location.reload();
            }, 100);
        } catch (error) {
            console.log("Unable to delete workout: " + error);
        }
    }

    async function handleFavoriteWorkout() {
        try {
            setIsFavorited(!isFavorited);
            if (!isFavorited) {
                console.log("Workout is favorited")
                await addFavoriteWorkoutToUserDocument(user, workoutId);
            } else {
                console.log("Workout unfavorited")
                await removeFavoriteWorkoutFromUserDocument(user, workoutId);
            }
            await updateFavoriteWorkout(user, workoutName, workoutId, isPrivate, !(isFavorited));
        } catch (error) {
            console.log("Unable to favorite workout: " + error);
        }
    }

    // Get workout link
    const workoutLink = `https://trainboard.vercel.app/workouts/${workoutId}`;

    return (
        <WorkoutWrapper wasDeleted={wasDeleted}>
            <Box py={"4px"} >
                <HStack justifyContent="center">
                    {isFavorited ?
                        <StarIcon w={8} h={8} color="yellow.400" onClick={handleFavoriteWorkout}/>
                        :
                        <StarIcon w={8} h={8} color="gray.600" onClick={handleFavoriteWorkout}/>
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
                            <MenuItem icon={<DeleteIcon />} onClick={handleDeleteWorkout}>
                                Delete Workout
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
