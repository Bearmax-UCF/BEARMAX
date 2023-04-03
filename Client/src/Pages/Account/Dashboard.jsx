import React, { useState } from "react";

import Graph from "../../Components/HomeGraph/graph";
import NavBar from "./../../Components/AccountNav/AccountNav";


export const Dashboard = (props) => {

    return (
        
        <div>
            <NavBar />

            <Graph/>
        </div>
    )
}

export default Dashboard;