import Navbar from "../components/Navbar";
import Background from "../components/Background";

import {
    VStack,
    Image,
    Text
  } from '@chakra-ui/react'

export default function AboutUs() {
    return (
        <div>
            <Background />
            <Navbar />
            <div id="explorecontentdiv">
                <style>
                    {'#explorecontentdiv { background-color:rgba(20,20,20,0.6); margin-top:1%; display:inline-block; width:90%; }'}
                </style>
                <VStack align-items="center" color="white">
                <Image src="trainboard_full.png"></Image>
                <Text fontWeight="bold" fontSize="xl" fontStyle="italic">A workout planner that works for you!"</Text>
                <text>TrainBoard is a centralized platform to store, view, modify workouts created by you and other users.</text>
                <br></br>
                <text>Developers:</text>
                <text>Kyle Gaudet</text>
                <text>Anderson Nouv</text>
                <text>Shafaat Osmani</text>
                <text>Bryan Montalvan</text>
                </VStack>
            </div>
        </div>
    )
}