import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { CSVLink } from "react-csv";
import * as Icons from "react-feather";

const Filter = ({
  states,
  project,
  handleProjectChange,
  projects,
  lga,
  handleLgaChange,
  csvReport,
  state,
  handleStateChange,
}) => {
  return (
    <div className="mb-3 mt-10 flex flex-row justify-evenly items-center">
      <h3>Filter: </h3>
     
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state}
            label="State"
            onChange={handleStateChange}
          >
            <MenuItem value="">Select State</MenuItem>
            {states &&
              states.map((item, i) => (
                <MenuItem value={item.name} key={i}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">LGA</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lga}
            label="LGA"
            onChange={handleLgaChange}
          >
            <MenuItem value="">Select LGA</MenuItem>
            {states &&
              states
                .filter((s) => s.name === state)
                .map((item, i) =>
                  item.lgas.map((lg, i) => (
                    <MenuItem value={lg} key={i}>
                      {lg}
                    </MenuItem>
                  ))
                )}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Current Project</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={project}
            label="Project"
            onChange={handleProjectChange}
          >
            <MenuItem value="">Select Project</MenuItem>
            {projects &&
              projects.map((item, i) => (
                <MenuItem value={item.title} key={i}>
                  {item.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      {/* <CSVLink className="flex flex-row" {...csvReport}>
        {" "}
        <Icons.Download /> Export Data
              </CSVLink> */}
    </div>
  );
};

export default Filter;
