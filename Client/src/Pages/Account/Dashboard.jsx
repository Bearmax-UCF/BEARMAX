import React from "react";

import Graph from "../../Components/HomeGraph/graph";
import NavBar from "./../../Components/AccountNav/AccountNav";

export const Dashboard = () => {

	const saveNote = () => {
		// TODO
	};

	return (
		<div>
			<NavBar />

			<h3 className="dashTitle">Galvanic Skin Response</h3>
			<div className="dash">
				<Graph />

				<div>
					<textarea className="dashNote"></textarea>
					<button  className="dashButton1"onClick={saveNote}>Save Note</button>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
