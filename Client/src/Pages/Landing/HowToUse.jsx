import React, { useState } from "react";
import NavBar from "./../../Components/LandingNav/LandingNav"

import Logo from "./../../Components/Images/face.png";
import Bear from "./../../Components/Images/full.PNG";

export const HowToUse = (props) => {

    return (
        
        <div>
            <NavBar />
            
            <div className="title">
                <img src={Logo} className="smLandLogo" alt="Logo: bear max face" />
            </div>

           
            <div className="textUse">
                <h1>How to Use BearMAX</h1>
                <p>Here will be instructions based calibration and different settings.</p>
            </div>

            <img src={Bear} className="useBear" alt="Design of bearmax, brown simple bear" />
            
        </div>
    )
}

export default HowToUse;