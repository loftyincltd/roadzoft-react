import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { API_BASE } from "../utils/Api";

function Dashboard() {
  const [user, setUser] = React.useState({});
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
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
    result && setUsers(result.data);
    setLoading(false);
    console.log("Users", result);
  };

  const data = users.map((user) => user.reports);
  const reports = [].concat.apply([], data);

  React.useEffect(() => {
    getUsers();
    getUser();
  }, []);

  const reportData = [
    {
      title: "Total",
      data: reports.length,
    },
    {
      title: "Approved",
      data: reports.filter((report) => report.status === "Approved").length,
    },
    {
      title: "Pending",
      data: reports.filter((report) => report.status === "Pending").length,
    },
    {
      title: "Disapproved",
      data: reports.filter((report) => report.status === "Disapproved").length,
    },
  ];

  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header user={user} title={title.toUpperCase()} />
          {/* <h3 className="mx-5 mt-5 mb-3 font-bold text-gray-700 text-2xl">Projects</h3> */}
          {/* <div className="mx-5 flex flex-row justify-between items-center">
            {infos.map((info) => (
              <TopCards info={info} />
            ))}
          </div> */}
          <h3 className="mx-5 mt-3 mb-3 font-bold text-gray-700 text-2xl">
            Reports
          </h3>
          <div className="mx-5 flex flex-row justify-between items-center">
            {reportData.map((report) => (
              <TopCards info={report} />
            ))}
          </div>
          <div className="main-items grid grid-cols-2 gap-4 my-3 mx-5">
            {titles.map((item, i) => (
              <LargeCard title={item} data={users} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
