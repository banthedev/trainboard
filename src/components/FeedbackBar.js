import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Flex,
    HStack,
    Button,
} from '@chakra-ui/react';
import { 
    deleteWorkoutFromCollecton,
    addFavoriteWorkoutToUserDocument,
    removeFavoriteWorkoutFromUserDocument,
    updateFavoriteWorkout 
} from '../context/StoreContext';
import { UserAuth } from '../context/AuthContext';

export default function FeedbackBar({ workoutName, workoutId, isPrivate, isFavorite, wasDeleted, setWasDeleted, ownsWorkout }) {
    // Navigate Hook, used to rerouting user
    const navigate = useNavigate();
    // Firebase user object
    const { user } = UserAuth();
    // State
    const [isFavorited, setIsFavorited] = useState(isFavorite);

    // Handles deletion of workout
    async function handleDeleteWorkout() {
        try {
            await deleteWorkoutFromCollecton(user, workoutName, isPrivate);
            setWasDeleted(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error) {
            console.error("Unable to delete workout: " + error);
        }
    }


    async function handleFavoriteWorkout() {
        try {
            setIsFavorited(!isFavorited);
            if (!isFavorited) {
                await addFavoriteWorkoutToUserDocument(user, workoutId);
            } else {
                await removeFavoriteWorkoutFromUserDocument(user, workoutId);
            }
            await updateFavoriteWorkout(user, workoutName, workoutId, isPrivate, !(isFavorited));
        } catch (error) {
            console.error("Unable to favorite workout: " + error);
        }
    }

        if (!ownsWorkout) {
        return (
            <>
                <Box bg="white" px={4} alignItems="center" width="fit-content" margin="auto" border="solid 5px black" marginTop="1%">
                    <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                        <HStack margin="auto" display={{ base: 'none', md: 'flex' }}>
                            <Button bg="green" color="white">
                                Like
                            </Button>

                            <Button bg="red">
                                Dislike
                            </Button>

                            <Button bg="green" color="white">
                                Favorite
                            </Button>

                            <Button bg="red">
                                Report
                            </Button>

                        </HStack>
                    </Flex >
                </Box >
            </>
        );
    }
    else {
        return (
            <>
                <Box bg="white" px={4} alignItems="center" width="fit-content" margin="auto" border="solid 5px black" marginTop="1%">
                    <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                        <HStack margin="auto" display={{ base: 'none', md: 'flex' }}>
                            <Button bg="red" onClick={handleDeleteWorkout}>
                                Delete Workout
                            </Button>

                            <Button bg="green" color="white" onClick={handleFavoriteWorkout}>
                                Favorite
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </>
        );
    }
}