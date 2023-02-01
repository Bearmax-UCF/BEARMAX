import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../Components/LandingNav/LandingNav"
import Logo from "./../../Components/Images/face.png";


export const LandingPage = (props) => {
    const navigate = useNavigate();
    
    return (
        
        <div>
            <NavBar />
            
            <div className="landing">
                <img src={Logo} className="landingLogo" alt="Logo: bear max face" />

                <h2>A dashbord made with care, for care</h2>

                <br></br>
                <button className="landingButton" onClick={() => navigate("/login")}>Login</button>
                <br></br>
                <button className="landingButton" onClick={() => navigate("/register")}>Register for an Account</button>
            </div>
        </div>
    )
}

export default LandingPage;