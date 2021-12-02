import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { Chart } from "react-charts";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { API_BASE } from "../utils/Api";
import { useHistory } from "react-router-dom";
import LargeProjectsCard from "../components/cards/LargeProjectCard";
import LargeReportsCard from "../components/cards/LargeReportsCard";
import LargeMessagesCard from "../components/cards/LargeMessagesCard";

function Dashboard() {
  const history = useHistory();
  const [user, setUser] = React.useState({});
  const [users, setUsers] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [reports, setReports] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const title = "Overview";

  const getData = async () => {
    const response = fetch(`${API_BASE}/`);
  };

  const infos = [
    {
      title: "Total",
      data: 5,
    },
    {
      title: "Ongoing",
      data: 15,
    },
    {
      title: "Pending",
      data: 2,
    },
    {
      title: "Completed",
      data: 20,
    },
  ];

  const titles = [
    { name: "Unresolved biodata requests" },
    { name: "Latest Reports" },
    { name: "Latest Messages" },
    { name: "New Users" },
  ];

  const getReports = async () => {
    const response = await fetch(`${API_BASE}/reports`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      title: "Total",
      color: "blue",
      data: reports.length,
    },
    {
      title: "Approved",
      color: "green",
      data: reports.filter((report) => report.status === "Approved").length,
    },
    {
      title: "Pending",
      color: "red",
      data: reports.filter((report) => report.status === "Pending").length,
    },
    {
      title: "Disapproved",
      color: "black",
      data: reports.filter((report) => report.status === "Rejected").length,
    },
  ];

  const CustomTooltip = () => {
    return (
      <div className="custom-tooltip">
        <p className="label">Users Per Project</p>
      </div>
    );
  };
  const CustomTooltip2 = () => {
    return (
      <div className="custom-tooltip">
        <p className="label">Reports Per Project</p>
      </div>
    );
  };

  const CustomizedLabel = () => {
    return (
      <>
        <p
        >
          Users
        </p>
      </>
    );
  };

  const CustomLabel  = () => { 
          return (
            <g>
              <foreignObject x={0} y={0} width={100} height={100}>
                <div>Label</div>
              </foreignObject>
            </g>
          );
    
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header user={user} title={title.toUpperCase()} />
          <hr />

          <h3 className="mx-5 mt-3 mb-3 font-bold text-gray-600 text-2xl">
            Reports
          </h3>
          <div className="mx-5 flex grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 justify-items-center items-center">
            {reportData.map((report) => (
              <TopCards info={report} />
            ))}
          </div>

          {localStorage.getItem("roles") == "Super Admin" && (
            <div className="flex flex-col justify-center items-center ">
              <div
                style={{}}
                className="chart-wrapper bg-white shadow-sm rounded-sm my-5 mx-5"
              >
                {/* <h3 className="mx-5 mt-5 mb-1 font-bold text-center text-gray-700">
                Users Per Project
              </h3> */}
                <div>
                  <h5 className="text-center my-1 text-xl text-gray-700">
                    Users per Project
                  </h5>
                  <ResponsiveContainer width={500} height={300}>
                    <LineChart
                      stroke="#8884d8"
                      width={500}
                      height={300}
                      data={projects}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                     
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="title" stroke="#8884d8" />

                      <YAxis stroke="#8884d8" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="users.length"
                        name="Users"
                        stroke="#2c4c2c"
                        activeDot={{ r: 8 }}
                        
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h5 className="text-center my-1 text-xl text-gray-700">
                    Reports per Project
                  </h5>
                  <ResponsiveContainer width={500} height={300}>
                    <BarChart width={500} height={300} data={projects}>
                      <XAxis dataKey="title" stroke="#8884d8" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip2 />} />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <Bar
                        dataKey="users[0].reports.length"
                        fill="#2c4c2c"
                        barSize={30}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          <div className="main-items justify-items-center items-center grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 my-3 mx-5">
            <div>
              <LargeCard title="New Users" data={users} link="users" />
            </div>
            <div>
              <LargeProjectsCard
                title="Latest Projects"
                data={projects}
                link="projects"
              />
            </div>
            <div>
              <LargeReportsCard
                title="Latest Reports"
                data={reports}
                link="reports"
              />
            </div>
            <div>
              <LargeMessagesCard title="New Messages" link="messages" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
