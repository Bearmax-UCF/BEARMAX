import React, { useState } from "react";
import NavBar from "../../Components/LandingNav/LandingNav"

import Logo from "./../../Components/Images/face.png";


export const LandingPage = (props) => {

    return (
        
        <div>
            <NavBar />
            
            <div className="landing">
                <h1>Welcome Friends!</h1>

                <img src={Logo} className="landingLogo" alt="Logo: bear max face" />

            </div>
        </div>
    )
}

export default LandingPage;