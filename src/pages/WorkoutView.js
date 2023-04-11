// React & React Router
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Firestore imports
import { database } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';
// Chakra-UI imports
import {
    Alert,
    AlertIcon
} from "@chakra-ui/react";
// Component imports
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import WorkoutInfo from "../components/WorkoutInfo";
import WorkoutViewTable from "../components/WorkoutViewTable";
import FeedbackBar from "../components/FeedbackBar";
import SelfFeedbackBar from "../components/SelfFeedbackBar";
// Context imports
import { getUsername } from "../context/StoreContext";
import { UserAuth } from "../context/AuthContext";
// Helper imports
import { checkIfUserCreated } from "../helpers/helper.js";

export default function WorkoutView() {
    // React States
    const [workout, setWorkout] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [ownsWorkout, setOwnsWorkout] = useState(false);
    const [wasDeleted, setWasDeleted] = useState(false);

    // Dynamic routing to get workout id
    const { workoutId } = useParams();

    // Firebase Auth Object
    const { user } = UserAuth();

    // Retrieve workout data from database
    useEffect(() => {
        async function fetchWorkout() {
            const docRef = doc(database, "workouts", workoutId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setWorkout(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }
        fetchWorkout();
    }, [workoutId]);

    // Check if the user is the creator of the workout
    useEffect(() => {
        async function checkUser() {
            if (workout) {
                const username = await getUsername(user);
                setOwnsWorkout(checkIfUserCreated(workout.creator, username));
            }
        }
        checkUser();
    }, [workout, user]);
    const handleExerciseChange = (newExercises) => {
        setExercises(newExercises);
    };

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
                    <WorkoutInfo
                        creator={workout.creator}
                        workoutName={workout.workoutName}
                        createdAt={workout.createdAt}
                        isPrivate={workout.isPrivate}
                    />
                    <WorkoutViewTable exercises={workout.workoutExercises} onExerciseChange={handleExerciseChange} />
                </div>
            </div>
        </div>
    )

}