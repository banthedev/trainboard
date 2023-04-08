import Navbar from "../components/Navbar";
import Background from "../components/Background";
import WorkoutInfo from "../components/WorkoutInfo";
import WorkoutTable from "../components/WorkoutTable";
import FeedbackBar from "../components/FeedbackBar";
import { useState, useEffect } from "react";
import { collection, doc, getDoc } from 'firebase/firestore';
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { Heading } from '@chakra-ui/react';

export default function WorkoutView() {
    const [workout, setWorkout] = useState(null);
    const [exercises, setExercises] = useState([]);
    const { workoutId } = useParams();

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
  
    if (!workout) {
      return <div>Loading...</div>;
    }



    const handleExerciseChange = (newExercises) => {
        setExercises(newExercises);
    };

    return (
        <div>
            <Background />
            <Navbar />
            <FeedbackBar />
            <div id="workoutviewcontentdiv">
                <style>
                    {'#workoutviewcontentdiv { background-color:white; margin-top:1%; display:inline-block; width:90%; }'}
                </style> 
                <WorkoutInfo 
                    creator={workout.creator} 
                    workoutName={workout.workoutName}
                    createdAt={workout.createdAt}
                    isPrivate={workout.isPrivate}
                />
                <WorkoutTable exercises={workout.workoutExercises} onExerciseChange={handleExerciseChange}/>
            </div>
        </div>
    )
}