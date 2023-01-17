import React, { useState } from "react";
import NavBar from "./../../Components/LandingNav/LandingNav"

import Logo from "./../../Components/Images/face.png";


export const AboutUs = (props) => {

    return (
        
        <div>
            <NavBar />
            
            <div className="about">
                <img src={Logo} className="smLandLogo" alt="Logo: bear max face" />
                
                <h1 className="head">About!</h1>
            </div>
        </div>
    )
}

export default AboutUs;