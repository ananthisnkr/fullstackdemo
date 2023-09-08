import React, { useEffect, useState } from "react";
import BarChart from "./component/chart/BarChart";
import LineChart from "./component/chart/LineChart";
import TreeMapChart from "./component/chart/TreeMapChart";
import QQPlot from "./component/chart/QQPlot";
import TableDisplay from "./component/Table/TableDisplay";
function Home() {
  const [dataobj, setDataobj] = useState([]);
  const [uniqueData, setUniqueData] = useState({});

  const uniqueValuefn = (jsonData) => {
    const endYear = new Set();
    const topic = new Set();
    const sector = new Set();
    const region = new Set();
    const pestle = new Set();
    const source = new Set();
    const swot = new Set();
    const country = new Set();
    const city = new Set();

    jsonData.forEach(element => {
      endYear.add(element.endYear);
      topic.add(element.topic);
      sector.add(element.sector);
      region.add(element.region);
      pestle.add(element.pestle);
      source.add(element.source);
      swot.add(element.swot);
      country.add(element.country);
      city.add(element.city);
    });
    return {
      endYear: Array.from(endYear).filter(x => x !== 0).sort(),
      topic: Array.from(topic).filter(x => x !== ""),
      sector: Array.from(sector).filter(x => x !== ""),
      region: Array.from(region).filter(x => x !== ""),
      pestle: Array.from(pestle).filter(x => x !== ""),
      source: Array.from(source).filter(x => x !== ""),
      swot: Array.from(swot).filter(x => x !== ""),
      country: Array.from(country).filter(x => x !== ""),
      city: Array.from(city).filter(x => x !== "")
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/getData'); 
      const jsonData = await response.json();
      const ud = uniqueValuefn(jsonData);
      setUniqueData(ud);
      setDataobj(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "beige" }}>
        <div className="barChartDisplay">
          <p style={{ fontSize: "25px" }}>Bar Chart</p>
          <BarChart data={dataobj} />
        </div>
        <div className="lineChartDisplay">
          <p style={{ fontSize: "25px" }}>Line Chart</p>
          <LineChart data={dataobj} />
        </div>
        <div className="treeMapDisplay">
          <p style={{ fontSize: "25px" }}>Tree Map Chart</p>
          <TreeMapChart data={dataobj} />
        </div>
        <div className="qqPlotDisplay">
          <p style={{ fontSize: "25px" }}>QQPlot Chart</p>
          <QQPlot data={dataobj} />
        </div>
      </div>
      <TableDisplay uniqueData={uniqueData} />
    </>
  );
}

export default Home;