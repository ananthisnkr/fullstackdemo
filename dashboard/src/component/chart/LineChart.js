import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
  const svgRef = useRef(null);
  const [selectedXAxis, setSelectedXAxis] = useState('startYear'); // Default x-axis
  const [selectedYAxis, setSelectedYAxis] = useState('intensity'); // Default variable
 
  // Color scale for different Y-Axis variables
  const colorScale = d3.scaleOrdinal()
    .domain(['intensity', 'relevance', 'likelihood'])
    .range(['steelblue', 'green', 'orange']); 

  useEffect(() => {
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 40 }; 

    // To select or create the SVG element
    const svg = d3.select(svgRef.current);

    // To clear the existing chart content
    svg.selectAll('*').remove();

    // To append a new group for the chart
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X and Y Scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d[selectedXAxis]))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[selectedYAxis])])
      .nice()
      .range([height, 0]);

    //To generate Line
    const line = d3.line()
      .x(d => xScale(d[selectedXAxis]))
      .y(d => yScale(d[selectedYAxis]));

    // To draw the line path
    chart.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', colorScale(selectedYAxis)) 
      .attr('stroke-width', 2)
      .attr('d', line);

   // Draw X and Y axes
    chart.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    chart.append('g')
      .call(d3.axisLeft(yScale));

      // X-axis label
      chart.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .text(selectedXAxis.charAt(0).toUpperCase()+ selectedXAxis.slice(1));
  
    // Y-axis label
    chart.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 15) 
      .attr('text-anchor', 'middle')
      .text(selectedYAxis.charAt(0).toUpperCase()+ selectedYAxis.slice(1));

  }, [data, selectedYAxis,selectedXAxis]);

  // Handlers for changing X and Y axes
  const handleXAxisChange = (event) => {
    setSelectedXAxis(event.target.value);
  };
  const handleYAxisChange = (event) => {
    setSelectedYAxis(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="x-axis-select">Choose X-Axis: </label>
        <select id="x-axis-select" value={selectedXAxis} onChange={handleXAxisChange}>
          <option value="startYear">Start Year</option>
          <option value="endYear">End Year</option>
        </select>
    
      <label htmlFor="y-axis-select">Choose Y-Axis: </label>
        <select id="variable-select" value={selectedYAxis} onChange={handleYAxisChange}>
          <option value="intensity">Intensity</option>
          <option value="relevance">Relevance</option>
          <option value="likelihood">Likelihood</option>
        </select>
      </div>
      
      <svg ref={svgRef} width={800} height={500}></svg>
    </div>
  );
};

export default LineChart;
