import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import * as Item from "@mui/material";
import * as Icons from "react-feather";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Moment from "react-moment";
import ProjectTable from "../components/tables/ProjectTable";
import { API_BASE } from "../utils/Api";
import HeaderWithButton from "../components/header/HeaderWithButton";
import { CSVLink } from "react-csv";
import { useHistory } from "react-router-dom";
import ExportModal from "../components/modals/ExportModal";
import ProjectModal from "../components/modals/ProjectModal";

function Projects() {
  const history = useHistory();
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState({})

  const loadNew = () => {
    history.push("/create-project");
  };

  const getProjects = async () => {
    
    const response = await fetch(`${API_BASE}/projects`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    setLoading(false);
    result && setProjects(result);
    console.log("Projects", result);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${API_BASE}/project/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    getProjects();
    console.log("Projects", result);
  };

  const getUser = async () => {
    try {
      const response = await fetch(`${API_BASE}/user/${localStorage.getItem("user")}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      const data = result.data;
      setUser(data)
      console.log("User:", result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUser()
    getProjects();
  }, []);

  const title = "PROJECTS";
 
  const columns = [
    {
      selector: "title",
      name: "Projects",
      sortable: true,
    },
    { selector: "description", name: "Description", sortable: true },
    {
      selector: "created_at",
      name: "Created Date",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return <Moment fromNow>{row.created_at}</Moment>;
      },
    },
    {
      selector: "id",
      name: "",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return (
          <Item.Button
            onClick={() => handleDelete(row.id)}
            color="error"
            variant="contained"
          >
            Delete
          </Item.Button>
        );
      },
    },
    {
      selector: "id",
      name: "",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return (
          <ProjectModal description={row.description} />
        );
      },
    },
  ];

  const data = React.useMemo(() => projects);



  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <HeaderWithButton
            handlClick={loadNew}
            title={title.toUpperCase()}
            user={user}
          />
          <h3 className="mx-5 mt-5 mb-3 font-bold text-gray-700 text-2xl">
            Projects
          </h3>
          {/* <div className="mx-5">
         <ExportModal />
         </div> */}
          <hr />
          {loading ? (
            <Box className="flex justify-center items-center" sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            
           
          <ProjectTable columns={columns} data={data} />
        
          )}
          </div>
      </div>
    </div>
  );
}

export default Projects;
