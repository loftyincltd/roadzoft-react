import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as Item from "@mui/material";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { API_BASE } from "../../utils/Api";
import * as Icons from "react-feather";
import { CSVLink } from "react-csv";
import Fuse from "fuse.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ExportModal() {
  const [open, setOpen] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [filterTerm, setFilterTerm] = React.useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getProjects = async () => {
    
    const response = await fetch(`${API_BASE}/projects`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setProjects(result);
    console.log("Projects", result);
  };


  React.useEffect(() => {
    getProjects();
  }, []);

  const handleFilter = (e) => {
      console.log(e.target.value)
      setFilterTerm(e.target.value)
  }

  const data = React.useMemo(() => projects);

  const fuse = new Fuse(data, {
    threshold: 0.5,
    includeMatches: true,
    keys: ["name", "title", "description", "users", "users.name", "users.State", "users.lga"],
  });
  const results = fuse.search(filterTerm);
    console.log("result", results);
    const filterResults = results.map((item) => item.item);

  const headers = [
    { label: "Project", key: "title" },
    { label: "Description", key: "description" },
    { label: "User", key: "users", cell: (row) => {
      return row.users.map(user => user.name)
    }},
  ];


  const csvData = filterTerm == "" ? data.map(row => ({
    ...row,
    users: JSON.stringify(row.users)
  })) : filterResults.map(row => ({
    ...row,
    users: JSON.stringify(row.users)
  }))

  const csvReport = {
    data: csvData,
    headers: headers,
    filename: `${Date.now()}_Project_Report.csv`
  };



  return (
    <div>
      <Button
        style={{ borderRadius: 50 }}
        color="primary"
        variant="contained"
        onClick={handleOpen}
      >
        Export Report
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Filter by Project Title, User Name, or State:
          </Typography>
          <form className="shadow rounded bg-gray-200 p-2 flex flex-col justify-center items-center">
            <div>
              <TextField
                style={{ width: 300, background: "white" }}
                placeholder="...search by name, project, state, lga etc"
                onChange={handleFilter}
                id="outlined-basic"
                label="...search by name, project, state, lga etc"
                variant="outlined"
              />
            </div>
          </form>
          <div className="flex flex-row mx-5 items-center"> 
          {filterResults.length == 0 ? <p className="text-red-700">No data to Export</p> : <p className="text-blue-700">Click Below to Export</p>}
          
          </div>
          <div className="my-5">
          <CSVLink className="flex flex-row" {...csvReport}> <Icons.Download />  Export Project</CSVLink>
          </div> 
        </Box>
      </Modal>
    </div>
  );
}
