import Navbar from "../components/Navbar";
import Background from "../components/Background";
import WorkoutTable from "../components/WorkoutTable";
import {
    Editable,
    EditablePreview,
    EditableInput,
    Button,
    Checkbox,
    Alert,
    AlertIcon
} from "@chakra-ui/react";
// React & React Router
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// Firebase
import { addWorkoutToDocument } from "../context/StoreContext";
import { UserAuth } from "../context/AuthContext";


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
            console.log(error);
            return;
        }
        setSaved(true);
        setTimeout(() => {
            navigate('/dashboard')
        }, 2000);
    };

    return (
        <div>
            <Background />
            <Navbar />
            {saved &&
                <Alert status='success'>
                    <AlertIcon />
                    Workout Saved! Redirecting...
                </Alert>
            }
            <div style={{ backgroundColor: "white", width: "90%", display: "inline-block", marginTop: "1%" }}>
                <Editable defaultValue='Workout #1' fontSize="2xl">
                    <EditablePreview />
                    <EditableInput onChange={handleWorkoutName} />
                </Editable>
                <WorkoutTable exercises={exercises} onExerciseChange={handleExerciseChange} />
                <Button colorScheme='green' size='lg' onClick={handleAddExercise}>
                    Add Exercise
                </Button>
            </div>
            <div style={{ padding: 10, backgroundColor: "white", width: "90%", display: "inline-block", paddingTop: "1%" }}>
                <Checkbox colorScheme='green' onChange={handleCheckboxChange}>Make Public</Checkbox>

                <Button colorScheme='green' size='lg' ml={10} onClick={handleSaveWorkout}>
                    Save Workout
                </Button>

                <Button colorScheme='red' size='lg' ml={10}>
                    Delete Workout
                </Button>
            </div>
        </div>
    )
}