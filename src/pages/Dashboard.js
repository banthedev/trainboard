import Navbar from "../components/Navbar";
import Background from "../components/Background";
import WorkoutCard from "../components/WorkoutCards";
import ExploreWorkoutCard from "../components/ExploreWorkoutCards";
import { Heading, HStack, Box, Stack, Button } from '@chakra-ui/react'
import { useState, useEffect, useMemo } from "react";
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { database } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { getUsername, getFavoritedWorkoutsFromCollection } from "../context/StoreContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
    // Auth
    const { user, getUserId } = UserAuth();
    // State
    const [workouts, setWorkouts] = useState([]);
    const [userName, setUserName] = useState("");
    const [favoriteWorkouts, setFavoriteWorkouts] = useState([]);

    const uid = getUserId();
    const privateQ = query(
        collection(database, "users", uid, "Private Workouts"), orderBy("createdAt", "desc")
    );
    const publicQ = query(
        collection(database, "users", uid, "Public Workouts"), orderBy("createdAt", "desc")
    );

    useEffect(() => {
        async function fetchData() {
            // Get username
            const name = await getUsername(user);
            setUserName(name);

            // Get favorited workouts
            const favWorkouts = await getFavoritedWorkoutsFromCollection(user);
            setFavoriteWorkouts(favWorkouts);
        }
        fetchData();
    }, [user]);

    useEffect(() => {
        const unsubscribePrivate = onSnapshot(privateQ, (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data());
            setWorkouts((prevWorkouts) =>
                prevWorkouts.filter((workout) => !workout.isPrivate).concat(data)
            );
        });

        const unsubscribePublic = onSnapshot(publicQ, (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data());
            setWorkouts((prevWorkouts) =>
                prevWorkouts.filter((workout) => workout.isPrivate).concat(data)
            );
        });

        return () => {
            unsubscribePrivate();
            unsubscribePublic();
        };
    }, [getUserId]);

    const recentWorkoutCards = useMemo(() => workouts.slice(0,4).map((workout) => (
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
    )), [workouts, userName]);

    const userWorkoutCards = useMemo(() => workouts.slice(0,4).map((workout) => (
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
    )), [workouts, userName]);

    const favoriteWorkoutCards = favoriteWorkouts.slice(0,4).map((workout) => {
        if (workout.creator !== userName) {
            return (
                <div key={workout.workoutName}>
                    <ExploreWorkoutCard
                        key={workout.workoutName}
                        user={user}
                        workoutName={workout.workoutName}
                        creator={workout.creator}
                        isPrivate={workout.isPrivate}
                        workoutId={workout.workoutId}
                        createdAt={workout.createdAt}
                        isFavorite={true}
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
                        isFavorite={true}
                    />
                </div>
            );
        }
    });

    return (
        <div>
            <Background />
            <Navbar />
            <div id="dashboardcontentdiv">
                <style>
                    {'#dashboardcontentdiv { background-color:rgba(20,20,20,0.6); margin-top:1%; display:inline-block; width:90%; }'}
                </style>

                <HStack>
                    <Heading as='h3' size='lg' float='left' marginLeft='5%' marginTop='2%' color='white' >
                        Recent Workouts
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
                        {recentWorkoutCards}
                    </Stack>
                </Box>

                <HStack marginLeft='5%' marginBottom="-7">
                    <Heading as='h3' size='lg' float='left' color='white'>
                        Favorite Workouts
                    </Heading>
                    <Link to="/favoriteworkouts">
                        <Button marginLeft='2%' paddingLeft='4px' paddingRight='4px' href='/favoriteworkouts' backgroundColor='white' fontWeight='bold'>
                            More
                        </Button>
                    </Link>
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

                <HStack marginLeft='5%' marginBottom="-7">
                    <Heading as='h3' size='lg' float='left' color='white' >
                        My Workouts
                    </Heading>
                    <Link to="/myworkouts">
                        <Button marginLeft='2%' paddingLeft='4px' paddingRight='4px' href='/myworkouts' backgroundColor='white' fontWeight='bold'>
                            More
                        </Button>
                    </Link>
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
                        {userWorkoutCards}
                    </Stack>
                </Box>

            </div>
        </div>
    )
}