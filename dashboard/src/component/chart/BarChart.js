import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef(null);
  const [selectedXAxis, setSelectedXAxis] = useState('endYear'); 
  const [selectedYAxis, setSelectedYAxis] = useState('intensity'); 

  const colorScale = d3.scaleOrdinal()
  .domain(['intensity', 'relevance', 'likelihood'])
  .range(['blueviolet', 'green', 'orange']); 

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
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    //X and Y scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d[selectedXAxis]))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[selectedYAxis])])
      .nice()
      .range([height, 0]);

    // To Draw Bar
    chart.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d[selectedXAxis]))
      .attr('y', d => yScale(d[selectedYAxis]))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d[selectedYAxis]))
      .attr('fill', colorScale(selectedYAxis)); 

    //To draw X and Y axes
    chart.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end');

    chart.append('g')
      .call(d3.axisLeft(yScale));
    
    // X and Y axes label
      chart.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10) 
      .attr('text-anchor', 'middle')
      .text(selectedXAxis.charAt(0).toUpperCase()+ selectedXAxis.slice(1));
  
  
    chart.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 15) 
      .attr('text-anchor', 'middle')
      .text(selectedYAxis.charAt(0).toUpperCase()+ selectedYAxis.slice(1));

  }, [data, selectedYAxis, selectedXAxis,colorScale]);

  // Handlers for changing Y and X axes
  const handleYAxisChange = (event) => {
    setSelectedYAxis(event.target.value);
  };

  const handleXAxisChange = (event) => {
    setSelectedXAxis(event.target.value);
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
      <svg ref={svgRef} width={800} height={600}></svg>
    </div>
  );
};

export default BarChart;
