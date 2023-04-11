import React, { useState } from "react";

import NavBar from "./../../Components/AccountNav/AccountNav";
import App from "./../../Components/Images/app.png";
import HowToUse from "../Landing/HowToUse";

export const Calibrate = (props) => {

    return (
        
        <div>
            <NavBar />
            
            <HowToUse />
        </div>
    )
}

export default Calibrate;

/*
<div className="calibrateText">
                <h1>How To Calibrate BEARMAX</h1>
            </div>

            <img src={App} className="calImg" alt="App face" />
</div>
*/