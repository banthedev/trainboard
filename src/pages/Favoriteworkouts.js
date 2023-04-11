import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Background from "../components/Background";
import FavoritesDropdown from "../components/FavoritesDropdown";
import { HStack, Heading, Box, Stack } from '@chakra-ui/react'
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getUsername } from "../context/StoreContext";
import WorkoutCard from "../components/WorkoutCards";
import ExploreWorkoutCard from "../components/ExploreWorkoutCards";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { database } from "../firebase";
export default function Favoriteworkouts() {
    const { user, getUserId } = UserAuth();
    const [privateWorkouts, setPrivateWorkouts] = useState([]);
    const [publicWorkouts, setPublicWorkouts] = useState([]);
    const [userWorkouts, setUserWorkouts] = useState([]);
    const [userName, setUserName] = useState("");
    const [favoriteWorkouts, setFavoriteWorkouts] = useState([]);

    // Fetches all workouts from the database
    useEffect(() => {
        async function fetchWorkouts() {
            const uid = getUserId();
            const privateQ = query(
                collection(database, "users", uid, "Private Workouts"),
                orderBy("createdAt", "desc")
            );
            const publicQ = query(
                collection(database, "users", uid, "Public Workouts"),
                orderBy("createdAt", "desc")
            );
            const [privateData, publicData] = await Promise.all([
                getDocs(privateQ).then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data())),
                getDocs(publicQ).then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data())),
            ]);
            setPrivateWorkouts(privateData);
            setPublicWorkouts(publicData);
            const name = await getUsername(user);
            setUserName(name);
        }
        fetchWorkouts();
    }, [user, getUserId]);

    useEffect(() => {
        const workouts = [...privateWorkouts, ...publicWorkouts];
        const uniqueWorkouts = [...new Map(workouts.map((workout) => [workout.workoutName, workout])).values()];
        setUserWorkouts(uniqueWorkouts);
    }, [privateWorkouts, publicWorkouts]);

    useEffect(() => {
        const favoriteWorkouts = userWorkouts.filter((workout) => workout.favorite);
        setFavoriteWorkouts(favoriteWorkouts);
    }, [userWorkouts]);


    const favoriteWorkoutCards = favoriteWorkouts.map((workout) => {
        console.log(workout.creator, userName)
        if (workout.creator !== userName) {
            return (
                <div key={workout.workoutName}>
                    <ExploreWorkoutCard
                        key={workout.workoutName}
                        user={user}
                        workoutName={workout.workoutName}
                        creator={userName}
                        isPrivate={workout.isPrivate}
                        workoutId={workout.workoutId}
                        createdAt={workout.createdAt}
                        isFavorite={workout.favorite}
                    />
                </div>
            )
        } else {
            return (
                <div key={workout.workoutName}>
                    <WorkoutCard
                        key={workout.workoutName}
                        user={user}
                        workoutName={workout.workoutName}
                        creator={userName}
                        isPrivate={workout.isPrivate}
                        workoutId={workout.workoutId}
                        createdAt={workout.createdAt}
                        isFavorite={workout.favorite}
                    />
                </div>
            );
        }
    });

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
                    <Heading marginTop='2%' marginLeft='5%' as='h3' size='lg' float='left' color='white'>
                        Favorite Workouts
                    </Heading>
                </HStack>
                <Box sx={{ display: "flex", alignItems: "center", margin: "auto" }}>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        textAlign="center"
                        justify="center"
                        marginLeft="30px"
                        marginRight="30px"
                        py={12}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, minmax(200px, 350px))',
                            gridGap: '30px',
                        }} >
                        {favoriteWorkoutCards}
                    </Stack>
                </Box>
            </div>
        </div>
    )
}