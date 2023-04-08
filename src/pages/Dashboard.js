import Navbar from "../components/Navbar";
import Background from "../components/Background";
import WorkoutCard from "../components/WorkoutCards";
import { Heading, HStack, Box, Stack, Button } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { collection, getDocs, query } from 'firebase/firestore'
import { database } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { getUsername } from "../context/StoreContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
    // Auth
    const { user, getUserId } = UserAuth();
    // State
    const [privateWorkouts, setPrivateWorkouts] = useState([]);
    const [publicWorkouts, setPublicWorkouts] = useState([]);
    const [userWorkouts, setUserWorkouts] = useState([]);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        async function fetchData() {
            const uid = getUserId();
            const privateQ = query(
                collection(database, "users", uid, "Private Workouts")
            );
            const publicQ = query(
                collection(database, "users", uid, "Public Workouts")
            );
            const privateSnapshot = getDocs(privateQ);
            const publicSnapshot = getDocs(publicQ);
            const [privateData, publicData] = await Promise.all([
                privateSnapshot.then((querySnapshot) => {
                    return querySnapshot.docs.map((doc) => doc.data());
                }),
                publicSnapshot.then((querySnapshot) => {
                    return querySnapshot.docs.map((doc) => doc.data());
                }),
            ]);
            setPrivateWorkouts(privateData);
            setPublicWorkouts(publicData);
            const name = await getUsername(user);
            setUserName(name);
        }
        fetchData();
    }, [user]);

    useEffect(() => {
        const workouts = [...privateWorkouts, ...publicWorkouts];
        const uniqueWorkouts = workouts.filter((workout, index) => {
            const exists = workouts.findIndex((w) => w.workoutName === workout.workoutName);
            return exists === index;
        });
        setUserWorkouts(uniqueWorkouts);
    }, [privateWorkouts, publicWorkouts]);


    const recentWorkoutCards = userWorkouts.slice(0, 4).map((workout) => {
        return (
            <div style={{ width: "25%", height: "20%" }} key={workout.workoutName}>
                <WorkoutCard
                    key={workout.workoutName}
                    workoutName={workout.workoutName}
                    creator={userName}
                    isPrivate={workout.isPrivate}
                    workoutId={workout.workoutId}
                    createdAt={workout.createdAt}
                />
            </div>
        )
    });


    const userWorkoutCards = userWorkouts.slice(0, 4).map((workout) => {
        return (
            <div style={{ width: "25%", height: "20%" }} key={workout.workoutName}>
                <WorkoutCard
                    key={workout.workoutName}
                    workoutName={workout.workoutName}
                    creator={userName}
                    isPrivate={workout.isPrivate}
                    workoutId={workout.workoutId}
                    createdAt={workout.createdAt}
                />
            </div>
        )
    });

    return (
        <div>
            <Background />
            <Navbar />
            <div id="dashboardcontentdiv">
                <style>
                    {'#dashboardcontentdiv { background-color:rgba(20,20,20,0.6); margin-top:1%; display:inline-block; width:90%; }'}
                </style>

                <Heading as='h3' size='lg' float='left' marginLeft='5%' marginTop='2%' color='white' >
                    Recent Workouts
                </Heading>
                <br></br>
                <Box py={12}>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        textAlign="center"
                        justify="center"
                        spacing={{ base: 4, lg: 10 }}
                        py={10}>
                        {recentWorkoutCards}
                    </Stack>
                </Box>

                <HStack marginLeft='5%' marginBottom="-7">
                    <Heading as='h3' size='lg' float='left' color='white'>
                        Favorite Workouts
                    </Heading>
                    <Button marginLeft='2%' paddingLeft='4px' paddingRight='4px' href='/favoriteworkouts' backgroundColor='white' fontWeight='bold'>
                        More
                    </Button>
                </HStack>
                <Box py={12}>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        textAlign="center"
                        justify="center"
                        spacing={{ base: 4, lg: 10 }}
                        py={10}>
                        {/* {publicWorkoutCards} */}
                    </Stack>
                </Box>

                <HStack marginLeft='5%' marginBottom="-7">
                    <Heading as='h3' size='lg' float='left' color='white' >
                        My Workouts
                    </Heading>
                    <Button marginLeft='2%' paddingLeft='4px' paddingRight='4px' href='/myworkouts' backgroundColor='white' fontWeight='bold'>
                        More
                    </Button>
                </HStack>
                <Box py={12}>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        textAlign="center"
                        justify="center"
                        spacing={{ base: 4, lg: 10 }}
                        py={10}>
                        {userWorkoutCards}
                    </Stack>
                </Box>
            </div>
        </div>
    )
}