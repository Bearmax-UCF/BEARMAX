import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import { io } from "socket.io-client";

import { buildPath } from "../BuildPath";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

/* 
TODO: 
- Socket connection and listening to GSR event
- useRef([]) for data values (object of value, ts) so they don't re-render infinitely
- setInterval to call the svg to re-render every 1/10 of a second?
- Graph:
    - Set up graph axis and title
    - X Scale start as last 10 seconds
        - If time allows, make an input to control how many seconds are on there
        - Use very few ticks to hopefully help the text not overlap
    - Tool tip for full date/time (ms included) and the GSR value
*/

export const Graph = () => {
	const [recordStart, setRecordStart] = useState(null);
	const [recording, setRecording] = useState(false);
	const { user } = useContext(AuthContext);

	// Format: {value: number, ts: Date}
	const dataRef = useRef([]);
	const svgRef = useRef();

	const redraw = () => {
		const data = dataRef.current;

		console.log("Length: " + data.length);

		// setting up svg
		const w = 600; // width
		const h = 500; // height
		const y = 8000; // this is the yAis ma
		const svg = d3
			.select(svgRef.current)
			.attr("width", w)
			.attr("height", h)
			.style("background", "#ffff")
			.style("overflow", "visible");

		// setting th scaling
		const xScale = d3
			.scaleLinear()
			.domain([0, data.length - 1])
			.range([0, w]);
		const yScale = d3.scaleLinear().domain([0, y]).range([h, 0]);

		const generateScaledLine = d3
			.line()
			.x((d, i) => xScale(i))
			.y(yScale)
			.curve(d3.curveCardinal);

		// Setting the axes
		const xAxis = d3
			.axisBottom(xScale)
			.ticks(data.length)
			.tickFormat((i) => i + 1);
		const yAxis = d3.axisLeft(yScale).ticks(5);
		svg.append("g")
			.call(xAxis)
			// this should move the xAxis ticks to the bottom??
			// its not doing the thing julie !!
			.attr("transform", "translate(0, height-offset)");
		svg.append("g").call(yAxis);

		// Setting up the data for the svg
		svg.selectAll(".line")
			.data([data])
			.join("path")
			.attr("d", (d) => generateScaledLine(d))
			.attr("fill", "none")
			.attr("stroke", "black");
	};

	useEffect(() => {
		if (recording) {
			const newSocket = io(buildPath("/"), {
				query: {
					userID: user.id,
				},
				extraHeaders: {
					Authorization: "Bearer " + user.token,
				},
			});

			console.log("Attempting socket connection");

			newSocket.on("connect", () => {
				console.log("Successfully connected to the server");

				newSocket.on("GSR", (value, ts) => {
					dataRef.current.push({ value, ts });
				});
			});

			newSocket.on("disconnect", () =>
				console.log("Socket disconnected")
			);

			const intervalID = setInterval(redraw, 200);

			return () => {
				if (!recording && recordStart) {
					console.log("Saving recording");
					const recordEnd = new Date();
					// TODO: Save dataRef somewhere (database? file download?)
					setRecordStart(null);
				}
				console.log("Disconnecting socket");
				newSocket.close();

				clearInterval(intervalID);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recording]);

	useEffect(redraw, []);

	return (
		<div id="graphContainer">
			<h3 id="graphTitle">Galvanic Skin Response</h3>
			<div className="graph">
				<svg id="gsrGraph" ref={svgRef}></svg>

				<button
					id="recordGSRButton"
					className="dashButton"
					onClick={() => {
						if (!recording) setRecordStart(new Date());
						setRecording(!recording);
					}}
				>
					{recording ? "Stop Recording" : "Start Recording"}
				</button>
			</div>
		</div>
	);
};

export default Graph;
