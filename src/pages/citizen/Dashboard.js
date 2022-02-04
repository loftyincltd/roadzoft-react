import React from "react";
import Badge from "@mui/material/Badge";
import TopCards from "../../components/cards/TopCards";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { API_BASE } from "../../utils/Api";
import { useHistory } from "react-router-dom";
import HomeTableCard from "../../components/cards/HomeTableCard";
import HomeTableCard2 from "../../components/cards/HomeTableCard2";

import BlueBG from "../../assets/bg/bluesquare.svg";
import GreenBG from "../../assets/bg/greensquare.svg";
import OrangeBG from "../../assets/bg/orangesquare.svg";
import RedBG from "../../assets/bg/redsquare.svg";
import YellowBG from "../../assets/bg/yellowsquare.svg";

function CitizenDashboard() {
  const history = useHistory();
  const [user, setUser] = React.useState({});
  const [users, setUsers] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [reports, setReports] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const title = "Overview";

  const getReports = async () => {
    const response = await fetch(`${API_BASE}/reports`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-RGM-PLATFORM": "Citizen"
      },
    });
    const result = await response.json();
    result && setReports(result.data.data);
    setLoading(false);
    console.log("Reports", result);
  };

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

  const getUsers = async () => {
    const response = await fetch(`${API_BASE}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    console.log("Users Res", response);
    result && setUsers(result.data.data);
    setLoading(false);
    console.log("Users", result);
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
    result && setProjects(result.data);
    console.log("Projects", result);
  };

  React.useEffect(() => {
    getProjects();
    getReports();
    getUsers();
    getUser();
    if (localStorage.getItem("roles") == "Ad-hoc") {
      alert("You dont have access");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
      history.push("/");
    }
  }, []);

  const reportData = [
    {
      title: "Total Reports",
      color: "rgb(17 76 168)",
      image: BlueBG,
      data: reports.length,
    },
    {
      title: "Approved",
      color: "#035C36",
      image: GreenBG,
      data: reports.filter((report) => report.status === "Approved").length,
    },
    {
      title: "Pending",
      color: "rgb(209 148 35)",
      image: OrangeBG,
      data: reports.filter((report) => report.status === "Pending").length,
    },

    {
      title: "Disapproved",
      color: "#0D0709",
      image: RedBG,
      data: reports.filter((report) => report.status === "Rejected").length,
    },
    {
      title: "Queried",
      color: "#DD411A",
      image: YellowBG,
      data: reports.filter((report) => report.status === "Queried").length,
    },
  ];

  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div style={{ overflow: "scroll" }} className="dashboard-right">
          <Header user={user} title={title} />
          <hr />
            <div className="dashboard-wrapper">
          <div className="mx-5 my-3 flex grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-1 justify-items-center items-center">
            <div
              className="flex flex-col justify-center items-center shadow-md"
              style={{
                width: 180,
                height: 180,
                background: "#043C2D",
                margin: 10,
                borderRadius: "20px",
              }}
            >
              <div className="report-item flex flex-row justify-center items-center text-white">
                <Badge variant="dot" color="error">
                  <h2 className="text-4xl mr-3">15</h2>
                </Badge>
                <span>New Reports</span>
              </div>
              <div
                style={{ color: "#49BF78" }}
                className="report-item flex flex-row justify-center items-center text-white"
              >
                <h4 className="text-xl mr-2">7</h4>
                <span className="text-sm">Citizen Reports</span>
              </div>
              <div
                style={{ color: "#CEFF68" }}
                className="report-item flex flex-row justify-center items-center text-white"
              >
                <h4 className="text-xl mr-2">8</h4>
                <span className="text-sm">Inspection Reports</span>
              </div>
            </div>
            {reportData.map((report) => (
              <TopCards info={report} />
            ))}
          </div>

          
          <div className="home-card shadow-md">
            <HomeTableCard data={reports} />
          </div>
          <div className="home-card shadow-md">
            <HomeTableCard2 data={reports} />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default CitizenDashboard;
