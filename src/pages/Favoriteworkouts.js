import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Background from "../components/Background";
import WorkoutCards from "../components/WorkoutCards";
import FavoritesDropdown from "../components/FavoritesDropdown";
import { HStack, Heading} from '@chakra-ui/react'

export default function Favoriteworkouts() {
    return (
        <div>
            <Background />
            <Navbar />
            <HStack >
                <Searchbar /> 
                <FavoritesDropdown />
            </HStack>
            <div id="favoritecontentdiv">
                <style>
                    {'#favoritecontentdiv { background-color:rgba(20,20,20,0.6); margin-top:1%; display:inline-block; width:90%; }'}
                </style>

                <HStack>
                    <Heading marginTop='2%' marginLeft='5%' as='h3' size='lg' float='left'  color='white'>
                            Favorite Workouts
                    </Heading>
                </HStack>

                <WorkoutCards />
            </div>
        </div>
    )
}