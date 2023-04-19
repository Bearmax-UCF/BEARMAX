import { useContext, useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import useWindowDimensions from "../WindowDimensions";
import { buildPath } from "../BuildPath";
import { io } from "socket.io-client";
import { AuthContext } from "../../AuthContext";
import { getFormattedTime } from "../../Utils/dates";

export const GSRGraph = ({ recording, recordingStart, setRecordingStart }) => {
	const { windowHeight, windowWidth } = useWindowDimensions();
	const { user } = useContext(AuthContext);

	const svgRef = useRef();
	const dataRef = useRef([]); //{value: number, ts: Date}
	const maxValRef = useRef(0);

	// TODO: Resizing the window causes forced repaints to use new dimensions,
	// But repaints on interval always use old dimensions

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
					console.log({ value, ts });
					dataRef.current.push({
						value,
						ts: new Date(ts),
					});
					if (value > maxValRef.current) maxValRef.current = value;
				});
			});

			newSocket.on("disconnect", () =>
				console.log("Socket disconnected")
			);

			const intervalID = setInterval(redraw, 100);

			return () => {
				if (!recording && recordingStart) {
					console.log("Saving recording");
					const recordEnd = new Date();
					// TODO: Save dataRef somewhere (database? file download?)
					setRecordingStart(null);
				}
				console.log("Disconnecting socket");
				newSocket.close();

				clearInterval(intervalID);
				dataRef.current = [];
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recording]);

	const dimensions = useMemo(
		() => ({
			width: windowWidth * 0.6,
			height: Math.max(300, windowHeight * 0.5),
			margin: {
				top: 60,
				right: 60,
				bottom: 60,
				left: 60,
			},
		}),
		[windowWidth, windowHeight]
	);

	const redraw = () => {
		const data = dataRef.current;
		const { width, height, margin } = dimensions;

		/* Make the actual graph */

		const xScale = d3
			.scaleTime()
			.nice()
			.domain([recordingStart, new Date()])
			.range([0, width]);

		const yScale = d3
			.scaleLinear()
			.domain([0, maxValRef.current + 50])
			.range([height, 0]);

		// Create root container where we will append all other chart elements
		const svgEl = d3.select(svgRef.current);
		svgEl.selectAll("*").remove();
		svgEl
			.style("background", "#ffff")
			.style("overflow", "visible")
			.attr("class", "gsrSvgBase");

		const svg = svgEl
			.append("g")
			.attr("class", "emotionGraphContent")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		// Add X grid lines with labels
		const xAxis = d3
			.axisBottom(xScale)
			.ticks(3)
			.tickSize(-height)
			.tickFormat((date) => getFormattedTime(date))
			.tickPadding(10);
		const xAxisGroup = svg
			.append("g")
			.attr("transform", `translate(0, ${height})`)
			.call(xAxis);
		xAxisGroup.select(".domain").remove();
		xAxisGroup.selectAll("line").attr("stroke", "none");
		xAxisGroup
			.selectAll("text")
			.attr("opacity", 1)
			.attr("color", "black")
			.attr("font-size", "0.75rem");

		// Add Y grid lines with labels
		const yAxis = d3
			.axisLeft(yScale)
			.ticks(4)
			.tickSize(-width)
			.tickFormat((val) => val)
			.tickPadding(10);
		const yAxisGroup = svg.append("g").call(yAxis);
		yAxisGroup.select(".domain").remove();
		yAxisGroup.selectAll("line").attr("stroke", "rgba(0, 0, 0, 0.2)");
		yAxisGroup
			.selectAll("text")
			.attr("opacity", 1)
			.attr("color", "black")
			.attr("font-size", "0.75rem");

		// Add axis labels
		svg.append("text")
			.attr("class", "stats-graph")
			.attr("text-anchor", "end")
			.attr("x", width + 25)
			.attr("y", height + 45)
			.text("Timestamp");

		svg.append("text")
			.attr("class", "stats-graph")
			.attr("text-anchor", "start")
			.attr("x", -45)
			.attr("y", -30)
			.text("GSR Reading");

		const line = d3
			.line()
			.x((d) => xScale(d.ts))
			.y((d) => yScale(d.value));

		// Add the line
		svg.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "#FF0000")
			.attr("stroke-width", 1.5)
			.attr("d", (d) => line(d));

		// Old Stuff

		// const generateScaledLine = d3
		// 	.line()
		// 	.x((d, i) => xScale(i))
		// 	.y(yScale)
		// 	.curve(d3.curveCardinal);

		// // Setting up the data for the svg
		// svg.selectAll(".line")
		// 	.data([data])
		// 	.join("path")
		// 	.attr("d", (d) => generateScaledLine(d))
		// 	.attr("fill", "none")
		// 	.attr("stroke", "black");
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(redraw, [dimensions]);

	const { width, height, margin } = dimensions;
	const svgWidth = width + margin.left + margin.right;
	const svgHeight = height + margin.top + margin.bottom;

	return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};
