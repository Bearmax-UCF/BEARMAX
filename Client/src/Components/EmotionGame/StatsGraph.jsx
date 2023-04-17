import * as d3 from "d3";
import { useState } from "react";
import { useEffect, useRef } from "react";

export const LINE_KEYS = ["Happy", "Sad", "Angry", "Neutral"];
export const LINE_COLORS = ["#FF0000", "#00FF00", "#0000FF", "#808080"];

const StatsGraph = ({ data = [], dimensions = {}, showingLines = [] }) => {
	const [lastShowing, setLastShowing] = useState([
		false,
		false,
		false,
		false,
	]);

	const svgRef = useRef(null);

	const { width, height, margin = {} } = dimensions;
	const svgWidth = width + margin.left + margin.right;
	const svgHeight = height + margin.top + margin.bottom;

	useEffect(() => {
		console.log("Redrawing emotion graph");
		const allEmotionData = [];
		for (let i = 0; i < 4; i++) {
			const emotionData = [];
			allEmotionData[i] = emotionData;
			if (!showingLines[i]) continue;

			data.forEach((game, gameIndex) => {
				emotionData.push({
					gameIndex,
					CorrectPercent: game.CorrectPercent[i],
					WrongPercent: game.WrongPercent[i],
				});
			});
		}

		const xScale = d3
			.scaleLinear()
			.domain([0, data.length - 1])
			.range([0, width]);

		const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

		// Create root container where we will append all other chart elements
		const svgEl = d3.select(svgRef.current);
		svgEl.selectAll("*").remove(); // Clear svg content before adding new elements
		svgEl.style("background", "#ffff").style("overflow", "visible");
		const svg = svgEl
			.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		// Add X grid lines with labels
		const xAxis = d3
			.axisBottom(xScale)
			.ticks(width < 600 ? data.length / 2 : data.length)
			.tickSize(-height)
			.tickFormat((val) => `${val + 1}`)
			.tickPadding(10);
		const xAxisGroup = svg
			.append("g")
			.attr("transform", `translate(0, ${height})`)
			.call(xAxis);
		xAxisGroup.select(".domain").remove();
		xAxisGroup.selectAll("line").attr("stroke", "rgba(0, 0, 0, 0.2)");
		xAxisGroup
			.selectAll("text")
			.attr("opacity", 1)
			.attr("color", "black")
			.attr("font-size", "0.75rem");

		// Add Y grid lines with labels
		const yAxis = d3
			.axisLeft(yScale)
			.ticks(10)
			.tickSize(-width)
			.tickFormat((val) => `${val}%`)
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
			.attr("class", "stats-graph-x")
			.attr("text-anchor", "end")
			.attr("x", width / 2 + 75)
			.attr("y", height + 45)
			.text("Game Instance");

		svg.append("text")
			.attr("class", "stats-graph-y")
			.attr("text-anchor", "start")
			.attr("x", -45)
			.attr("y", -30)
			.text("Percent Correct");

		const line = d3
			.line()
			.x((d) => xScale(d.gameIndex))
			.y((d) => yScale(d.CorrectPercent));

		// .data takes in an array of arrays, each of which are the x/y values for each emotion
		const lines = svg
			.selectAll(".line")
			.data(allEmotionData)
			.enter()
			.append("path")
			.attr("fill", "none")
			.attr("stroke", (_, index) => LINE_COLORS[index])
			.attr("stroke-width", 3)
			.attr("d", (d) => line(d));

		console.log("" + lastShowing, "" + showingLines);
		lines.each((_, index, nodes) => {
			// TODO: This doesn't work yet
			const element = nodes[index];
			const length = element.getTotalLength();
			if (!lastShowing[index] && showingLines[index]) {
				d3.select(element)
					.attr("stroke-dasharray", `${length},${length}`)
					.attr("stroke-dashoffset", length)
					.transition()
					.duration(750)
					.ease(d3.easeLinear)
					.attr("stroke-dashoffset", 0);
			}
		});

		setLastShowing(showingLines);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, dimensions, showingLines]);

	return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export default StatsGraph;
