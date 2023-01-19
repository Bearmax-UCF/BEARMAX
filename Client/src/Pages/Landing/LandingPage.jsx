import React, { useState } from "react";
import NavBar from "../../Components/LandingNav/LandingNav"

import Logo from "./../../Components/Images/face.png";


export const LandingPage = (props) => {

    return (
        
        <div>
            <NavBar />
            
            <div className="landing">
                <img src={Logo} className="landingLogo" alt="Logo: bear max face" />

            </div>
        </div>
    )
}

export default LandingPage;