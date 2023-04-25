//import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

import Background from "../components/Background";

import ExploreWorkoutCard from "../components/ExploreWorkoutCards";
import { Stack, Box, Heading, HStack } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { database } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { getUsername } from "../context/StoreContext";
//import ExploreNav from "../components/ExploreNav";
//import Searchbar from "../components/Searchbar";

export default function ExplorePage() {
    const [exploreWorkouts, setExploreWorkouts] = useState([]);

    const { user } = UserAuth();

    useEffect(() => {
        const exploreQ = query(collection(database, "workouts"), where("isPrivate", "==", false));
        const unsubscribe = onSnapshot(exploreQ, (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data());
            setExploreWorkouts(data);
        });
        return unsubscribe;
    }, []);


    const exploreWorkoutCards = exploreWorkouts.map((workout) => {
        return (
            <div key={workout.workoutId}>
                <ExploreWorkoutCard
                    key={workout.workoutName}
                    user={user}
                    workoutName={workout.workoutName}
                    creator={workout.creator}
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
            {/*<Searchbar />*/}
            <div id="explorecontentdiv">
                <style>
                    {'#explorecontentdiv { background-color:rgba(20,20,20,0.6); margin-top:1%; display:inline-block; width:90%; }'}
                </style>
                {/*<ExploreNav />*/}
                <HStack>
                    <Heading marginTop='2%' marginLeft='5%' as='h3' size='lg' float='left' color='white'>
                            Explore
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
                        {exploreWorkoutCards}
                    </Stack>
                </Box>
            </div>
        </div>
    )
}