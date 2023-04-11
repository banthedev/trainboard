import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Background from "../components/Background";
import WorkoutCard from "../components/WorkoutCards";
import MyWorkoutsDropdown from "../components/MyWorkoutsDropdown";
import { HStack, Heading, Stack,Box } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { database } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { getUsername } from "../context/StoreContext";

export default function Myworkouts() {
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
                collection(database, "users", uid, "Private Workouts"), orderBy("createdAt", "desc")
            );
            const publicQ = query(
                collection(database, "users", uid, "Public Workouts"), orderBy("createdAt", "desc")
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

    const userWorkoutCards = userWorkouts.map((workout) => {
        return (
            <div  key={workout.workoutName}>
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
    });

    return (
        <div>
            <Background />
            <Navbar />
            <HStack >
                <Searchbar />
                <MyWorkoutsDropdown />
            </HStack>
            <div id="myworkoutscontentdiv">
                <style>
                    {'#myworkoutscontentdiv { background-color:rgba(20,20,20,0.6); margin-top:1%; display:inline-block; width:90%; }'}
                </style>

                <HStack>
                    <Heading marginTop='2%' marginLeft='5%' as='h3' size='lg' float='left' color='white'>
                        My Workouts
                    </Heading>
                </HStack>
                <Box sx={{display:"flex", alignItems: "center", margin:"auto"}}>
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