import React, { useState } from "react";
import NavBar from "./../../Components/AccountNav/AccountNav";

import Full from "./../../Components/Images/full.png";



export const Settings = (props) => {

    return (
        
        <div>
            <NavBar />

            <div className="settingsText">
                <h2>Settings</h2>

                <div className="setInfo">
                    <a>First Name</a> <br></br>
                    <a>Last Name</a>
                    <a>Email</a>
                </div>
            </div>

            <img src={Full} className="settingBear" alt="Logo: Cute Brown Bear with heart on chest." />
        </div>
    )
}

export default Settings;