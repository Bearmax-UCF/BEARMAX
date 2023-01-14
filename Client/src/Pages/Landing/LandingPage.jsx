import React, { useState } from "react";
import NavBar from "../../Components/LandingNav/LandingNav"


export const LandingPage = (props) => {

    return (
        
        <div>
            <NavBar />
            
            <div className="landing">
                <h1>Welcome Friends!</h1>

            </div>
        </div>
    )
}

export default LandingPage;