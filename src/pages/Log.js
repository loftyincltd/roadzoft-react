import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { API_BASE } from "../utils/Api";
import ProjectTable from "../components/tables/ProjectTable";
import Moment from "react-moment";
import * as Item from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import UserDialog from "../components/dialog/LogDialog";
import ProjectDialog from "../components/dialog/ProjectLog";
import PaginationComponent from "../components/tables/Pagination";

function Log() {
  const [user, setUser] = React.useState({});
  const [logUser, setLogUser] = React.useState({});
  const [userLog, setUserLog] = React.useState([]);
  const [projectLog, setProjectLog] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageProject, setPageProject] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalProjectPages, setProjectTotalPages] = React.useState(1);
  const [countPerPage, setCountPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const title = "Logs";

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleChangeProject = (event, value) => {
    setPageProject(value);
  };

  const getUserLogs = async () => {
    
    const response = fetch(`${API_BASE}/logs/users?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await (await response).json();
    setUserLog(result.data.data);
    setTotalPages(result.data.last_page);
    setCountPerPage(result.data.per_page);
   
    console.log("User Log", result);
  };

  const getProjectLogs = async () => {
    const response = fetch(`${API_BASE}/logs/projects?page=${pageProject}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await (await response).json();
    setProjectLog(result.data.data);
    setProjectTotalPages(result.data.last_page);
    setCountPerPage(result.data.per_page);
    console.log("Project Log", result);
  };
  const columns = [
    {
      selector: "user",
      name: "User",
      sortable: true,
      cell: (row) => {
        return (
          <div>
            <h2>{row.user.name}</h2>
            <h2>
              {row.user.lga}/{row.user.State}
            </h2>
            <h2>{row.user.phone}</h2>
            <h2>{row.user.email}</h2>
          </div>
        );
      },
    },
    {
      selector: "affected_model",
      name: "Affected Model",
      sortable: true,
      cell: (row) => {
        return (
          row.affected_model != null && (
            <UserDialog model={row.affected_model} />
          )
        );
      },
    },
    { selector: "description", name: "Activity", sortable: true },
    {
      selector: "created_at",
      name: "Date",
      sortable: true,
      cell: (row) => {
        return <Moment format="YYYY-MM-DD">{row.created_at}</Moment>;
      },
    },
    { selector: "action", name: "", sortable: true },
  ];

  const projcolumns = [
    {
      selector: "user",
      name: "User",
      sortable: true,
      cell: (row) => {
        return (
          <div>
            <h2>{row.user.name}</h2>
            <h2>
              {row.user.lga}/{row.user.State}
            </h2>
            <h2>{row.user.phone}</h2>
            <h2>{row.user.email}</h2>
          </div>
        );
      },
    },
    {
      selector: "affected_model",
      name: "Affected Model",
      sortable: true,
      cell: (row) => {
        return (
          row.affected_model != null && (
            <ProjectDialog model={row.affected_model} />
          )
        );
      },
    },
    { selector: "description", name: "Activity", sortable: true },
    {
      selector: "created_at",
      name: "Date",
      sortable: true,
      cell: (row) => {
        return <Moment format="YYYY-MM-DD">{row.created_at}</Moment>;
      },
    },
    { selector: "action", name: "", sortable: true },
  ];
  const data = [...userLog, ...projectLog];
  const getUser = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/user/${localStorage.getItem("user")}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      const data = result.data;
      setUser(result.data);
      setLoading(false)
      console.log("User:", result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);
  React.useEffect(() => {
    getUserLogs();
  }, [page]);
  React.useEffect(() => {
    getProjectLogs();
  }, [pageProject]);
  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header user={user} title={title.toUpperCase()} />

          <div className="main-items mx-5">
            {loading ? (
              <Box
                className="flex justify-center items-center"
                sx={{ display: "flex" }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <div>
                <h3>User Log</h3>
                <ProjectTable
                  data={userLog}
                  columns={columns}
                  total={countPerPage}
                />
                <PaginationComponent
                  page={page}
                  defaultPage={page}
                  count={totalPages}
                  handleChange={handleChange}
                />
                <h3>Project Log</h3>
                <ProjectTable
                  data={projectLog}
                  columns={projcolumns}
                  total={countPerPage}
                />
                <PaginationComponent
                  page={pageProject}
                  defaultPage={pageProject}
                  count={totalProjectPages}
                  handleChange={handleChangeProject}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Log;
