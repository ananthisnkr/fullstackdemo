import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const QQPlot = ({ data }) => {
  const svgRef = useRef(null);
  const [selectedVariable, setSelectedVariable] = useState('intensity');

  useEffect(() => {
    const width = 800;
    const height = 400;
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    
    //To select or create the SVG element
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    // To clear the existing chart content
    svg.selectAll("*").remove();

    // To append a new group for the chart
    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    //X and Y Scale
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.endYear))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[selectedVariable])])
      .nice()
      .range([height, 0]);

    // To define color scale based on the selected variable
    const colorScale = d3.scaleOrdinal()
      .domain(['intensity', 'relevance', 'likelihood'])
      .range(['blueviolet', 'green', 'orange']);


    chart.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.endYear))
      .attr('cy', d => yScale(d[selectedVariable]))
      .attr('r', 5)
      .attr('fill', colorScale(selectedVariable)); 

    // To draw X and Y axes
    chart.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(10))
      .append('text')
      .attr('x', width)
      .attr('y', 30)
      .attr('fill', 'black')
      .attr('text-anchor', 'end')
      .text('End Year');

    
    chart.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('x', 0)
      .attr('y', -10)
      .attr('fill', 'black')
      .text(selectedVariable.charAt(0).toUpperCase() + selectedVariable.slice(1))
      .attr('text-anchor', 'start');

      // X axis label
      chart.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10) 
      .attr('text-anchor', 'middle')
      .text("End Year");
  
    // Y-axis label
    chart.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 15) 
      .attr('text-anchor', 'middle')
      .text(selectedVariable.charAt(0).toUpperCase()+ selectedVariable.slice(1));


  }, [data, selectedVariable]);

  const handleVariableChange = (event) => {
    setSelectedVariable(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="variable-select">Choose Variable: </label>
        <select id="variable-select" value={selectedVariable} onChange={handleVariableChange}>
          <option value="intensity">Intensity</option>
          <option value="relevance">Relevance</option>
          <option value="likelihood">Likelihood</option>
        </select>
      </div>
      <svg ref={svgRef} width={800} height={500}></svg>
    </div>
  );
};

export default QQPlot;
