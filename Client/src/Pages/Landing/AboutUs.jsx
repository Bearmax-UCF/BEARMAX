import React, { useState } from "react";
import NavBar from "./../../Components/LandingNav/LandingNav"

import Logo from "./../../Components/Images/face.png";
import Bear from "./../../Components/Images/full.PNG";


export const AboutUs = (props) => {

    return (
        
        <div>
            <NavBar />
            
            <div className="title">
                <img src={Logo} className="smLandLogo" alt="Logo: bear max face" />
                
                {<h1 className="head">About!</h1>}
            </div>

            <img src={Bear} className="aboutBear" alt="Design of bearmax, brown simple bear" />

            <p>The following area will have why we created bearmax and as well the goal of the project and maybe future plans.</p>
        </div>
    )
}

export default AboutUs;