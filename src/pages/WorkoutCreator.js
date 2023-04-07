import Navbar from "../components/Navbar";
import Background from "../components/Background";
import WorkoutTable from "../components/WorkoutTable";
import {
    Editable,
    EditablePreview,
    EditableInput,
    Button,
    Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { addWorkoutToDocument } from "../context/StoreContext";
import { UserAuth } from "../context/AuthContext";
export default function WorkoutCreator() {
    const [workoutName, setWorkoutName] = useState('Workout #1');
    const [isPrivate, setIsPrivate] = useState(false);
    const [exercises, setExercises] = useState([
        {
            exerciseName: "Bicep Curl",
            sets: "3",
            reps: "10"
        },
        {
            exerciseName: "Tricep Extension",
            sets: "3",
            reps: "10"
        },
        {
            exerciseName: "Shoulder Press",
            sets: "3",
            reps: "8"
        },
    ]);

    const handleWorkoutName = (e) => {
        setWorkoutName(e.target.value);
    };

    const handleAddExercise = () => {
        setExercises([...exercises, { exerciseName: "Exercise", sets: "0", reps: "0" }]);
        console.log(exercises);
    };

    const handleExerciseChange = (newExercises) => {
        setExercises(newExercises);
    };

    const handleCheckboxChange = (e) => {
        setIsPrivate(e.target.checked);
    };      

    const { user } = UserAuth();

    async function handleSaveWorkout() {
        const workout = {
            workoutName: workoutName,
            exercises: exercises,
            isPrivate: isPrivate,
        };
        await addWorkoutToDocument(user, workout, isPrivate);
    };

    return (
        <div>
            <Background />
            <Navbar />
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