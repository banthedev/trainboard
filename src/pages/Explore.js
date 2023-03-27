import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Background from "../components/Background";
import ExploreNav from "../components/ExploreNav";
import WorkoutCards from "../components/WorkoutCards";

export default function Explore() {
    return (
        <div>
            <Background />
            <Navbar />
            <Searchbar />
            <div id="explorecontentdiv">
                <style>
                    {'#explorecontentdiv { background-color:rgba(20,20,20,0.6); margin-top:1%; display:inline-block; width:90%; }'}
                </style>
                <ExploreNav />
                <WorkoutCards />
            </div>
        </div>
    )
}