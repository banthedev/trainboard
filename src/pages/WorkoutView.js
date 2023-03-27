import Navbar from "../components/Navbar";
import Background from "../components/Background";
import WorkoutInfo from "../components/WorkoutInfo";
import WorkoutTable from "../components/WorkoutTable";
import FeedbackBar from "../components/FeedbackBar";

export default function WorkoutView() {
    return (
        <div>
            <Background />
            <Navbar />
            <FeedbackBar />
            <div id="workoutviewcontentdiv">
                <style>
                    {'#workoutviewcontentdiv { background-color:white; margin-top:1%; display:inline-block; width:90%; }'}
                </style> 
                <WorkoutInfo />
                <WorkoutTable />
            </div>
        </div>
    )
}