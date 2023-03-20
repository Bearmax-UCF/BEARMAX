import React, { useState } from "react";

import NavBar from "./../../Components/AccountNav/AccountNav";
import Comments from "./../../Components/ReportElements/comments";

export const ReportHist = (props) => {

    return (
        
        <div>
            <NavBar />

            <div>
                <Comments />
            </div>
        </div>
    )
}

export default ReportHist;