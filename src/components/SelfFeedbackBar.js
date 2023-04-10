import {
    Box,
    Flex,
    HStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
} from '@chakra-ui/react';
import { deleteWorkoutFromCollecton } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export default function SelfFeedbackBar({ workoutName, isPrivate, wasDeleted, setWasDeleted }) {
    // Navigate Hook, used to rerouting user
    const navigate = useNavigate();
    // Firebase user object
    const { user } = UserAuth();

    // Handles deletion of workout
    async function handleDeleteWorkout() {
        try {
            await deleteWorkoutFromCollecton(user, workoutName, isPrivate);
            setWasDeleted(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error) {
            console.log("Unable to delete workout: " + error);
        }
    }

    return (
        <>
            <Box bg="white" px={4} alignItems="center" width="fit-content" margin="auto" border="solid 5px black" marginTop="1%">
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack margin="auto" display={{ base: 'none', md: 'flex' }}>
                        <Button bg="red" onClick={handleDeleteWorkout}>
                            Delete Workout
                        </Button>

                        <Flex alignItems={'center'}>
                            <Menu >
                                <MenuButton
                                    as={Button}
                                    cursor={'pointer'}
                                    label={'Muscle Group...'}
                                    bg="gold"
                                >
                                    Export
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Image</MenuItem>
                                    <MenuDivider />
                                    <MenuItem>Pdf</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>

                        <Button bg="green" color="white">
                            Favorite
                        </Button>
                    </HStack>
                </Flex>
            </Box>
        </>
    );
}