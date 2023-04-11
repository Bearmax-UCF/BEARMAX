import React, { useState } from "react";
import NavBar from "./../../Components/LandingNav/LandingNav"

import Logo from "./../../Components/Images/face.png";
import Bear from "./../../Components/Images/full.png";

import Aone from "./../../Components/Images/catAOne.png";
import Atwo from "./../../Components/Images/catATwo.png";
import Bone from "./../../Components/Images/catBOne.png";
import Btwo from "./../../Components/Images/catBTwo.png";

export const HowToUse = (props) => {

    return (
        
        <div>
            <NavBar />
            

           <div className="howToUse">
                <img src={Bear} className="useBear" alt="Design of bearmax, brown simple bear" />
                <div className="textUse1">
                    <h1 className="useHead">How to Use BearMAX</h1>
                    <p>Currently, Bearmax is capable of two modes, important to social-emotional learning facilitation: </p>
                        <ul>
                            <li>Mirror Image Game</li>
                            <li>Stress Detection Mode </li>
                        </ul>

                    <h3>For the "Mirror Image" Game</h3>
                        <p>"Mirror Image" helps your child to recognize and mimic emotions portrayed by the robot.</p>
                        <ol>
                            <li>To start the game, open the Bearmax app and log in</li>
                            <li>After logging in, click "(I forgot button names)" to start the "Mirror Image" Game.</li>
                            <li>When "Mirror Image" begins, Bearmax will portray an emotion. This emotion will be either
                                "happy, sad, (I forgot the last core emotion), or neutral." </li>
                            <li>When Bearmax portrays this emotion, have your child do their best to "mirror" this emotion
                                through expression while looking at Bearmax. </li>
                            <li>Bearmax will check to see if your child is expressing the chosen emotion. Once done correctly, 
                                Bearmax will send a cheerful message back to your child through the app.</li>
                            <li>Bearmax continues with the next emotion (randomly selected). Steps 3-6 will repeat until the
                                button "(I forgot button names)" is pressed for the game to stop.</li>
                            <li>Check your results here, on the website, when completed! These results will tell you how many 
                                emotions your child "mirrored" correctly.</li>
                        </ol>
                </div>

                <div className="container">
                    <div className="catElement">
                        <h6>Category A:</h6> 
                            <img src={Aone} className="catOne" alt="..." />
                            <img src={Atwo} className="catOne" alt="..." /> 
                        <h6>Category B:</h6>
                            <img src={Bone} className="catTwo" alt="..." />
                            <img src={Btwo} className="catTwo" alt="..." />
                    </div>

                    <div className="textUse2">
                        <h3>For Stress Detection Mode: </h3>
                            <p>Stress detection is a built-in, passive feature that can be used alongside Bearmax when having access 
                                to both the wearable device and website. This mode is currently recommended for sessions with a 
                                clinician.</p>
                            <ol>
                                <li>To begin stress detection mode, have your child wear the device on the wrist of their non-dominant 
                                    hand. </li>
                                <li>Connect the electrodes from the device to the following locations on the child's hand (based on 
                                    their comfort). You can either copy Image Category A or Image Category B for electrode placement. 
                                    Image A: Electrodes placed at the palm of the hand Image B: Electrodes placed at the index and 
                                    middle fingers </li>
                                <li>Turn on the wearable device. </li>
                                <li>Log in to your account on the website. </li>
                                <li>On the website, click "(I forgot button names)" on the Dashboard (main page after logging in) 
                                    to connect the wearable device to the platform. (6) If successful, data will begin to populate 
                                    a real-time graph for review on the Dashboard. If unsuccessful, tips will be provided on how 
                                    to re-connect the device.</li>
                                <li>Click "(I forgot button names)" to stop data collection from the Wearable Device and turn it off.</li>
                                <li>Save the data to your computer by clicking "Save.”</li>
                            </ol>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default HowToUse;
