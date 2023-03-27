import Navbar from "../components/Navbar";
import Background from "../components/Background";
import WorkoutCards from "../components/WorkoutCards";
import { Heading, HStack, Link } from '@chakra-ui/react'

export default function Dashboard() {
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
                <WorkoutCards />

                <HStack marginLeft='5%' marginBottom="-7">
                    <Heading as='h3' size='lg' float='left'  color='white'>
                        Favorite Workouts
                    </Heading>
                    <Link marginLeft='2%' paddingLeft='4px' paddingRight='4px' href='/favoriteworkouts' backgroundColor='white' fontWeight='bold'>
                        More
                    </Link>
                </HStack>
                <WorkoutCards />

                <HStack marginLeft='5%' marginBottom="-7">
                    <Heading as='h3' size='lg' float='left' color='white' >
                        My Workouts
                    </Heading>
                    <Link marginLeft='2%' paddingLeft='4px' paddingRight='4px' href='/myworkouts' backgroundColor='white' fontWeight='bold'>
                        More
                    </Link>
                </HStack>
                <WorkoutCards />
            </div>
        </div>
    )
}