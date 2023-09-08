import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Tooltip, Select, MenuItem } from "@mui/material";
import "../../component/asset/Tooltip.css";

function TreeMapChart({ data }) {
  const svgRef = useRef();
  const [selectedValue, setSelectedValue] = useState("intensity");

  useEffect(() => {
    const width = 800;
    const height = 600;

    //To select or create the SVG element
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    //To clear the existing chart content
    svg.selectAll("*").remove();

    //To create the treemap layout
    const treemapLayout = d3.treemap()
      .size([width, height])
      .padding(1)
      .round(true);

    // To create hierarchy using data and sum based on selected value
    const root = d3.hierarchy({ children: data })
      .sum(d => d[selectedValue]);

    //To Apply the treemap layout to the hierarchy
    treemapLayout(root);

    // To create color scale for cell colors
    const colorScale = d3.scaleSequential(d3.interpolateViridis)
      .domain([0, d3.max(data, d => d[selectedValue])]);

    //To select cells and bind data
    const cell = svg.selectAll("g")
      .data(root.leaves())
      .enter().append("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

    // To draw rectangles for cells
    cell.append("rect")
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", d => colorScale(d.data[selectedValue]))
      .attr("class", "tooltip-rect")
      .append("title")
      .text(d => ` End Year ${d.data.endYear}: ${selectedValue} ${d.data[selectedValue]}`);

  }, [data, selectedValue]);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <div>
        <Select value={selectedValue} onChange={handleSelectChange}>
          <MenuItem value="intensity">Intensity</MenuItem>
          <MenuItem value="relevance">Relevance</MenuItem>
          <MenuItem value="likelihood">Likelihood</MenuItem>
        </Select>

      </div>
      <svg ref={svgRef} width={800} height={700}></svg>
      <Tooltip id="tooltip" style={{ opacity: 0 }} />
    </div>
  );
}

export default TreeMapChart;
