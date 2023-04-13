import React from "react";

import Graph from "../../Components/HomeGraph/graph";
import NavBar from "./../../Components/AccountNav/AccountNav";

export const Dashboard = () => {
	return (
		<div>
			<NavBar />

			<h3 className="dashTitle">Galvanic Skin Response</h3>
			<div className="dash">
				<Graph />

				<textarea className="dashNote"></textarea>
			</div>
		</div>
	);
};

export default Dashboard;
