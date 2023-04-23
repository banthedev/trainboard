// React & React Router
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Firestore imports
import { database } from "../firebase";
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
// Chakra-UI imports
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
    Alert,
    AlertIcon
} from '@chakra-ui/react';
// Component imports
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import WorkoutInfo from "../components/WorkoutInfo";
import WorkoutTable from "../components/WorkoutTable";
import WorkoutViewTable from "../components/WorkoutViewTable";
import FeedbackBar from "../components/FeedbackBar";
import SelfFeedbackBar from "../components/SelfFeedbackBar";
// Context imports
import { getUsername, editUserWorkout, editMainWorkout } from "../context/StoreContext";
import { UserAuth } from "../context/AuthContext";
// Helper imports
import { checkIfUserCreated } from "../helpers/helper.js";

import React, { createRef } from 'react'
import { useScreenshot } from 'use-react-screenshot'

import html2canvas from 'html2canvas';

export default function WorkoutView() {
    // React States
    const [workout, setWorkout] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [ownsWorkout, setOwnsWorkout] = useState(false);
    const [wasDeleted, setWasDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);
    // Dynamic routing to get workout id
    const { workoutId } = useParams();

    // Firebase Auth Object
    const { user } = UserAuth();

    // Retrieve workout data from database
    useEffect(() => {
        async function fetchWorkout() {
            const docRef = doc(database, "workouts", workoutId);
            const unsub = onSnapshot(docRef, (doc) => {
                setWorkout(doc.data());
                setExercises(doc.data().workoutExercises);
            });
            return unsub;
        }
        fetchWorkout();
    }, [workoutId]);

    // Check if the user is the creator of the workout
    const checkUser = useCallback(async () => {
        if (workout) {
            const username = await getUsername(user);
            setOwnsWorkout(checkIfUserCreated(workout.creator, username));
        }
    }, [workout, user]);

    useEffect(() => {
        checkUser();
    }, [checkUser]);

    // Handle editing of workout
    const handleExerciseChange = useCallback((newExercises) => {
        setExercises(newExercises);
    }, []);

    // Handles adding an exercise to the workout
    const handleAddExercise = useCallback(() => {
        setExercises((prevExercises) => [...prevExercises, { exerciseName: "Exercise", sets: "0", reps: "0" }]);
    }, []);

    // Onclick change to editing mode
    const handleIsEditing = useCallback(() => {
        setIsEditing(true);
    }, []);

    // Reload page on cancel
    function handleCancelChanges() {
        window.location.reload();
    }

    async function handleSaveWorkout() {
        try {
            await editUserWorkout(user, workout.workoutName, workout.isPrivate, exercises);
            await editMainWorkout(workout.workoutId, exercises)
        } catch (error) {
            console.log("Error editing workout: (in component)" + error);
        }

        setTimeout(() => {
            setIsEditing(false);
            setEditSuccess(true);
        }, 1000);
    };

    // check if workout name is already loaded (it always should be but it breaks if you dont check)
    var imgName
    if(workout)
        imgName = workout.workoutName + ".png";
    else 
        imgName = "workout.png";

    const ref = createRef(null)
    const [image, takeScreenshot] = useScreenshot()

    const getImage = () => { 
        // take screen shot
        takeScreenshot(ref.current);

        // create download link for image and click it
        var ss = document.createElement('a');
        ss.setAttribute('href', image);
        ss.setAttribute('download', imgName);
        ss.style.display = 'none';
        document.body.appendChild(ss);
        ss.click();
        document.body.removeChild(ss);
    }

    // Check if workout is loaded, if not display loading
    if (!workout) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Background />
            <Navbar />
            {wasDeleted &&
                <Alert status='error'>
                    <AlertIcon />
                    Workout has been deleted! Redirecting...
                </Alert>
            }
            {editSuccess &&

                <Alert status='success'>
                    <AlertIcon />
                    Workout has been edited!
                </Alert>
            }
            {
                ownsWorkout
                    ?
                    <SelfFeedbackBar workoutName={workout.workoutName} workoutId={workout.workoutId} isPrivate={workout.isPrivate} isFavorite={workout.favorite} wasDeleted={wasDeleted} setWasDeleted={setWasDeleted} />
                    :
                    <FeedbackBar
                    />}
            <div id="viewdiv">
                <style>
                    {'#viewdiv { background-color:rgba(20,20,20,0.6); margin-top:1%; display:inline-block; width:90%; height:auto; min-height:100% }'}
                </style>
                <div id="workoutviewcontentdiv">
                    <style>
                        {'#workoutviewcontentdiv { background-color:white; margin-top:1%; display:inline-block; width:90%; padding-bottom:1%"; margin-bottom:"1%";}'}
                    </style>
                    <Box alignItems={'center'} margin = "auto" marginTop = "10px" marginBottom = "-30px">
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
                                    <MenuItem id="imgbutton" onClick = {getImage}>Image</MenuItem>
                                    <MenuDivider />
                                    <MenuItem>Pdf</MenuItem>
                                </MenuList>
                            </Menu>
                    </Box>
                    <div ref = {ref} >
                    <WorkoutInfo
                        creator={workout.creator}
                        workoutName={workout.workoutName}
                        createdAt={workout.createdAt}
                        isPrivate={workout.isPrivate}
                    />
                    {(ownsWorkout && isEditing) ?
                        <WorkoutTable exercises={exercises} onExerciseChange={handleExerciseChange} />
                        :
                        <WorkoutViewTable exercises={workout.workoutExercises} onExerciseChange={handleExerciseChange} />
                    }
                    {isEditing &&
                        <Button colorScheme='green' size='lg' onClick={handleAddExercise}>
                            Add Exercise
                        </Button>
                    }
                </div>
                {isEditing ?
                    <div>
                        <Button colorScheme='green' size='lg' onClick={handleSaveWorkout}>Save Changes</Button>
                        <Button colorScheme='red' size='lg' onClick={handleCancelChanges}>Cancel Changes</Button>
                    </div>
                    :
                    <Button colorScheme='green' size='lg' onClick={handleIsEditing}>Edit Workout</Button>
                }
                </div>
            </div>
        </div >
    )

}