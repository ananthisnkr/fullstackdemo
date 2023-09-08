import React, { useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import { useState, useRef } from "react";

function DropDown({ filterDetails, setFilterDetails, displayName, labelName, values }) {

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    // To update filter details when the dropdown value changes
    setFilterDetails(prevRequestData => ({
      ...prevRequestData,
      filterData: {
        ...prevRequestData.filterData,
        [name]: value
      }
    }));
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={labelName + "_input"}>{displayName}</InputLabel>
      <Select className="dropDown"
        labelId={labelName + "_input"}
        value={selectedValue}
        label={displayName}
        name={labelName}
        onChange={handleChange}
      >
        {values?.map((element) => (
          <MenuItem value={element}>{element}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default DropDown;