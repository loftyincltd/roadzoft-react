import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { API_BASE } from "../utils/Api";
import ProjectTable from "../components/tables/ProjectTable";
import Moment from 'react-moment';
import * as Item from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Log() {
  const [user, setUser] = React.useState({});
  const [logUser, setLogUser] = React.useState({});
  const [userLog, setUserLog] = React.useState([]);
  const [projectLog, setProjectLog] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const title = "Logs";

  const getUserLogs = async () => {
    setLoading(true)
    const response = fetch(`${API_BASE}/logs/users`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await (await response).json();
    setUserLog(result.data);
    setLoading(false)
    console.log("User Log", result);
  };

  const getProjectLogs = async () => {
    setLoading(true)
    const response = fetch(`${API_BASE}/logs/projects`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await (await response).json();
    setProjectLog(result.data);
    setLoading(false)
    console.log("Project Log", result);
  };
  const columns = [
    { selector: "user.name", name: "User", sortable: true },
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
      console.log("User:", result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUser();
    getUserLogs();
    getProjectLogs();
  }, []);
  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header user={user} title={title.toUpperCase()} />

          <div className="main-items mx-5">
            {loading ? 
            (<Box className="flex justify-center items-center" sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>) :
            (<div>
              <ProjectTable data={data} columns={columns} />
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Log;
