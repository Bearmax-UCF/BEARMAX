import { useContext, useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import useWindowDimensions from "../WindowDimensions";
import { buildPath } from "../BuildPath";
import { io } from "socket.io-client";
import { AuthContext } from "../../AuthContext";
import { getFileName, getFormattedTime } from "../../Utils/dates";

export const GSRGraph = ({
	recording,
	recordingStart,
	setRecordingStart,
	saveOptions,
}) => {
	const { windowHeight, windowWidth } = useWindowDimensions();
	const { user } = useContext(AuthContext);

	const svgRef = useRef();
	const dataRef = useRef([]); //{value: number, ts: Date}
	const allTimesRef = useRef([]); // [Date]
	const maxValRef = useRef(0);
	const lastMouseCoordsRef = useRef(null);

	const dimensionsRef = useRef(null);
	dimensionsRef.current = useMemo(
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
		[windowHeight, windowWidth]
	);

	const repaintIntervalRef = useRef(null);

	const downloadGSR = () => {
		const element = document.createElement("a");
		let content = dataRef.current.reduce((prev, curr) => {
			return prev + `${curr.ts},${curr.value}\n`;
		}, "timestamp,value,\n");

		const file = new Blob([content], {
			type: "text/plain",
		});
		element.href = URL.createObjectURL(file);
		element.download = "gsr_" + getFileName(new Date()) + ".csv";
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
		element.remove();
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

			newSocket.on("connect", () => {
				console.log("Successfully connected to the server!");

				dataRef.current = [];
				allTimesRef.current = [];
				maxValRef.current = 0;

				newSocket.on("GSR", (value, ts) => {
					console.log(value, ts);
					dataRef.current.push({
						value,
						ts: new Date(ts),
					});
					if (value > maxValRef.current) maxValRef.current = value;
					allTimesRef.current.push(new Date(ts));
				});
			});

			newSocket.on("disconnect", () =>
				console.log("Disconnected from server.")
			);

			repaintIntervalRef.current = setInterval(redraw, 100);

			return () => {
				const data = dataRef.current;
				const bodyData = { GSRData: [], GSRTime: [] };

				for (let dataPoint of data) {
					bodyData.GSRData.push(dataPoint.value);
					bodyData.GSRTime.push(dataPoint.ts);
				}

				if (saveOptions.db) {
					// Save recording to database
					fetch(buildPath("/api/gsr/"), {
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
							Authorization: "Bearer " + user.token,
						},
						body: JSON.stringify(bodyData),
					})
						.then((res) => {
							if (res.status === 200)
								console.log(
									"Saved recording to database successfully!"
								);
							else
								console.error(
									"Could not save recording to database."
								);
						})
						.catch((err) => console.error(err));
					setRecordingStart(null);
				}
				if (saveOptions.file) downloadGSR();

				newSocket.close();
				clearInterval(repaintIntervalRef.current);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recording]);

	const redraw = () => {
		const data = dataRef.current;
		const { width, height, margin } = dimensionsRef.current;

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

		/* Manage tooltip and mouse events if not recording*/
		const rectOverlay = svg
			.append("rect")
			.attr("cursor", "move")
			.attr("fill", "none")
			.attr("pointer-events", "all")
			.attr("width", width)
			.attr("height", height)
			.on("mousemove", focusMouseMove)
			.on("mouseover", focusMouseOver)
			.on("mouseout", focusMouseOut);

		const mouseLine = svg
			.append("path")
			.attr("class", "mouse-line")
			.attr("stroke", "#303030")
			.attr("stroke-width", 2)
			.attr("opacity", "0");

		const tooltip = svg
			.append("g")
			.attr("class", "tooltip-wrapper")
			.attr("display", "none")
			.attr("pointer-events", "none");

		const tooltipBackground = tooltip
			.append("rect")
			.attr("fill", "#e8e8e8");
		const tooltipText = tooltip.append("text");

		if (lastMouseCoordsRef.current) focusMouseMove();

		function focusMouseMove(event) {
			if (data.length === 0) return;
			const allTimes = allTimesRef.current;

			tooltip.attr("display", null);

			let mouseCoords = [];
			if (event) mouseCoords = d3.pointer(event);
			else mouseCoords = lastMouseCoordsRef.current;

			lastMouseCoordsRef.current = mouseCoords;

			const timeOnMouse = xScale.invert(mouseCoords[0]);
			const nearestTimeIndex = d3.bisect(allTimes, timeOnMouse);

			// get the dates on either of the mouse cord
			const d0 = allTimes[nearestTimeIndex - 1];
			const d1 = allTimes[nearestTimeIndex];

			let closestTime;
			if (!d0 || d0 < xScale.domain()[0]) {
				closestTime = d1;
			} else if (d1 > xScale.domain()[1]) {
				closestTime = d0;
			} else {
				// decide which date is closest to the mouse
				closestTime = timeOnMouse - d0 > d1 - timeOnMouse ? d1 : d0;
			}

			const closestTimeXCoord = xScale(closestTime);
			const closestTimeIndex = allTimes.indexOf(closestTime);
			const closestTimeVal = data[closestTimeIndex].value;

			tooltipText.selectAll(".tooltip-text-line").remove();
			svg.selectAll(".tooltip-line-circles").remove();

			svg.append("circle")
				.attr("class", "tooltip-line-circles")
				.attr("r", 5)
				.attr("fill", "#000000")
				.attr("cx", xScale(closestTime))
				.attr("cy", yScale(closestTimeVal));

			tooltipText
				.append("tspan")
				.attr("class", "tooltip-text-line")
				.attr("x", "5")
				.attr("dy", "20px")
				.attr("fill", "#000000")
				.text(`Time Stamp: ${getFormattedTime(closestTime)}`);

			tooltipText
				.append("tspan")
				.attr("class", "tooltip-text-line")
				.attr("x", "5")
				.attr("dy", "20px")
				.attr("fill", "#000000")
				.text(`Value: ${closestTimeVal.toFixed(2)}`);

			const tooltipWidth = tooltipText.node().getBBox().width;
			const tooltipHeight = tooltipText.node().getBBox().height;
			const rectOverlayWidth = rectOverlay.node().getBBox().width;
			tooltipBackground
				.attr("width", tooltipWidth + 10)
				.attr("height", tooltipHeight + 10);

			if (closestTimeXCoord + tooltipWidth >= rectOverlayWidth) {
				tooltip.attr(
					"transform",
					"translate(" +
						(closestTimeXCoord - tooltipWidth - 20) +
						"," +
						mouseCoords[1] +
						")"
				);
			} else {
				tooltip.attr(
					"transform",
					"translate(" +
						(closestTimeXCoord + 10) +
						"," +
						mouseCoords[1] +
						")"
				);
			}
		}

		function focusMouseOver() {
			mouseLine.attr("opacity", "1");
			tooltip.attr("display", null);
		}

		function focusMouseOut() {
			mouseLine.attr("opacity", "0");
			tooltip.attr("display", "none");
			svg.selectAll(".tooltip-line-circles").remove();
			lastMouseCoordsRef.current = null;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(redraw, [windowHeight, windowWidth]);

	const { width, height, margin } = dimensionsRef.current;
	const svgWidth = width + margin.left + margin.right;
	const svgHeight = height + margin.top + margin.bottom;

	return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};
