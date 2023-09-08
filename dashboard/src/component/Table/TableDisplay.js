import React, { useEffect, useState } from "react";
import DropDown from "../Table/DropDown";
import { Table, Grid, Pagination, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl} from '@mui/material';

function TableDisplay({ uniqueData }) {
  const [recordCount, setRecordCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterResult, setFilterResult] = useState([]);
  const [filterDetails, setFilterDetails] = useState({
    pageNumber: 1,
    pageSize: 10,
    filterData: {
      endYear: "",
      topic: "",
      sector: "",
      region: "",
      pestle: "",
      swot: "",
      source: "",
      country: "",
      city: ""
    }
  })
  // To fetch data based on filter 
  const fetchData = async () => {

    const response = await fetch("http://localhost:8080/getData/search", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filterDetails),
    });
    const result = await response.json();
    setFilterResult(result.data);
    setRecordCount(result.count);
  }

  //To fetch data when filter details change
  useEffect(() => {
    fetchData();
  }, [filterDetails]);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
    setFilterDetails(prevRequestData => ({
      ...prevRequestData,
      pageNumber: newPage
    }));
  }

  function handlePageSizeChange(newPageSize) {
    setPageSize(newPageSize);
    setFilterDetails(prevRequestData => ({
      ...prevRequestData,
      pageSize: newPageSize,
      pageNumber: 1 // Reset to first page when changing page size
    }));
    setCurrentPage(1);
  }
  return (
    <>

      <div>
        <div style={{ fontSize: "20px" }}>Filter Data</div>
        <Grid container spacing={2}>
          {Object.entries(filterDetails.filterData)?.map(([key, value], index) => (
            <Grid key={key} item xs={12} sm={6} md={4}>
              <FormControl style={{ width: "100%" }}>
                <DropDown
                  filterDetails={filterDetails}
                  setFilterDetails={setFilterDetails}
                  displayName={key}
                  labelName={key}
                  values={uniqueData[key]}
                />
              </FormControl>
            </Grid>
          ))}
        </Grid>


      </div>
      <div style={{ padding: "30px" }}> Record per Page:
        <select value={filterDetails.pageSize}
          onChange={(e) => handlePageSizeChange(e.target.value)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
          <option value="80">80</option>
          <option value="90">90</option>
          <option value="100">100</option>
        </select>
      </div>
      <div style={{ padding: "10px" }}> No of Records : {recordCount}</div>
      <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ border: "2px solid black" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "wheat" }}>
                <TableCell>End Year</TableCell>
                <TableCell>Topics</TableCell>
                <TableCell>Sector</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Pestle</TableCell>
                <TableCell>Swot</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {filterResult?.map((row, index) => (
                <TableRow key={index} sx={{ border: "2px solid black" }}>
                  <TableCell>{row.endYear}</TableCell>
                  <TableCell>{row.topic}</TableCell>
                  <TableCell>{row.sector}</TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>{row.pestle}</TableCell>
                  <TableCell>{row.swot}</TableCell>
                  <TableCell>{row.source}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(recordCount / pageSize)} 
          page={currentPage}
          onChange={(event, newPage) => handlePageChange(newPage)} 
          variant="outlined"
          shape="rounded"
        />

      </div>

    </>
  );
}

export default TableDisplay;