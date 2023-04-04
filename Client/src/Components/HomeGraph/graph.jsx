import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

export const Graph = (props) => {

    // This is just test data for building graph
    const [data] = useState ([25, 23, 10, 15, 20, 21, 28, 20, 15, 10, 1000, 1900, 10, 29, 100,200, 100,234,233,245,246,21,456,2,345,12]);

    const svgRef = useRef();

    // This will update anytime data changes.
    useEffect (() => {
        // setting up svg
        const w = 600; // width
        const h = 500; // height
        const y = 8000; // this is the yAis ma
        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('background', '#333')
            .style('overflow', 'visible');

        // setting th scaling
        const xScale = d3.scaleLinear()
            .domain([0, data.length -1])
            .range([0, w]);
        const yScale = d3.scaleLinear()
            .domain([0,y])
            .range([h,0]);

        const generateScaledLine = d3.line()
            .x((d,i) => xScale(i))
            .y(yScale)
            .curve(d3.curveCardinal);

        // Setting the axes
        const xAxis = d3.axisBottom(xScale)
            .ticks(data.length)
            .tickFormat(i => i + 1);
        const yAxis = d3.axisLeft(yScale)
            .ticks(5);
        svg.append('g')
            .call(xAxis)
            // this should move the xAxis ticks to the bottom?? 
            // its not doing the thing julie !!
            .attr('transform', 'translate(0, height-offset)');
        svg.append('g')
            .call(yAxis);

        // Setting up the data for the svg
        svg.selectAll('.line')
            .data([data])
            .join('path')
                .attr('d', d => generateScaledLine(d))
                .attr('fill', 'none')
                .attr('stroke', 'black');
    }, [data]);

    return (
        <div className="Graph">
            <svg ref={svgRef}></svg>
        </div>
    )
}

export default Graph;