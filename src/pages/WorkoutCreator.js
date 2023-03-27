import Navbar from "../components/Navbar";
import Background from "../components/Background";
import WorkoutTable from "../components/WorkoutTable";
import WorkoutAddButton from "../components/WorkoutAddButton";
import WorkoutSaveButton from "../components/WorkoutSaveButton";
import WorkoutDeleteButton from "../components/WorkoutDeleteButton";
import WorkoutPublicCheckbox from "../components/WorkoutPublicCheckbox";

export default function WorkoutCreator() {
    return (
        <div>
            <Background />
            <Navbar />
            
            <div id="createworkoutdiv">
                <style>
                    {'#createworkoutdiv { background-color: rgb(255,255,255); margin-top:1%; display:inline-block; width:90%; }'}
                </style>
                <WorkoutTable />
                <WorkoutAddButton />
            </div>

            <div id="buttonsdiv">
                <style>
                    {'#buttonsdiv { background-color: rgb(255,255,255); padding-top:1%; display:inline-block; width:90%; }'}
                </style>
                <WorkoutPublicCheckbox />
                <WorkoutSaveButton />
                <WorkoutDeleteButton />
            </div>
            
        </div>
    )
}