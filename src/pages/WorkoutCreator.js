// React & React Router
import { useState } from "react";
import { HStack, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
// Firebase
import { addWorkoutToDocument } from "../context/StoreContext";
import { UserAuth } from "../context/AuthContext";
// Component imports
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import WorkoutTable from "../components/WorkoutTable";
// Chakra Imports
import {
    Editable,
    EditablePreview,
    EditableInput,
    Button,
    Checkbox,
    Alert,
    AlertIcon
} from "@chakra-ui/react";

export default function WorkoutCreator() {
    const [workoutName, setWorkoutName] = useState('Workout #1');
    const [isPrivate, setIsPrivate] = useState(true);
    const [exercises, setExercises] = useState([
        {
            exerciseName: "Change Me",
            sets: "0",
            reps: "0"
        },
    ]);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    const handleWorkoutName = (e) => {
        setWorkoutName(e.target.value);
    };

    const handleAddExercise = () => {
        setExercises([...exercises, { exerciseName: "Exercise", sets: "0", reps: "0" }]);
    };

    const handleExerciseChange = (newExercises) => {
        setExercises(newExercises);
    };

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setIsPrivate(false);
        }
    };

    const { user } = UserAuth();


    async function handleSaveWorkout() {
        const workout = {
            workoutName: workoutName,
            exercises: exercises,
            isPrivate: isPrivate,
        };
        // Try to add workout to document
        try {
            await addWorkoutToDocument(user, workout, isPrivate);
        } catch (error) {
            console.error(error);
            return;
        }
        setSaved(true);
        setTimeout(() => {
            navigate('/dashboard')
        }, 1000);
    };

    return (
        <div>
                <Background />
                <Navbar />
                <div  id="creatorcontentdiv"> 
                    <style>
                        {'#creatorcontentdiv { background-color:rgba(20,20,20,0.6); margin-top:1%; display:inline-block; width:90%; height:auto; min-height:100% }'}
                    </style>
                    {saved &&
                        <Alert status='success'>
                            <AlertIcon />
                            Workout Saved! Redirecting...
                        </Alert>
                    }
                    <div style={{ backgroundColor: "white", width: "90%", display: "inline-block", marginTop: "1%", marginBottom: "1%" }}>
                        <Editable defaultValue='Workout #1' fontSize="2xl" fontWeight={"bold"} textDecoration="underline">
                            <EditablePreview />
                            <EditableInput onChange={handleWorkoutName} />
                        </Editable>
                        <WorkoutTable exercises={exercises} onExerciseChange={handleExerciseChange} />

                        <br></br>
                        <br></br>
                        <Button colorScheme='green' size='lg' onClick={handleAddExercise}>
                            Add Exercise
                        </Button>
                        <br></br>
                        <br></br>

                        <HStack style={{ padding: 10, paddingTop: "1%" , justifyContent:"center"}} spacing="50px">
                            <Checkbox colorScheme='green' onChange={handleCheckboxChange}>Make Public</Checkbox>

                            <Button colorScheme='green' size='lg' onClick={handleSaveWorkout}>
                                Save Workout
                            </Button>
                        </HStack>
                    </div>
                </div>
            </div>
    )
}