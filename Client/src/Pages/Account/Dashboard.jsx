import React, { useState } from "react";

import Graph from "../../Components/HomeGraph/graph";
import NavBar from "./../../Components/AccountNav/AccountNav";


export const Dashboard = (props) => {

    return (
        
        <div>
            <NavBar />


            <h3 className="graphDisplay">Galvanic Skin Response</h3>
            <div className="graphDisplay">
                <Graph/>
            </div>
        </div>
    )
}

export default Dashboard;