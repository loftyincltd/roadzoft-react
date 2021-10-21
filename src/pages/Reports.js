import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import * as Item from "@mui/material";
import Moment from "react-moment";
import ProjectTable from "../components/tables/ProjectTable";
import { API_BASE } from "../utils/Api";

function Reports() {
  const [user, setUser] = React.useState({})
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const title = "REPORTS";
  
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
    getUsers()
    const data = users.map(user => user.reports);
    console.log("Reports", [].concat.apply([], data))
  }, [])

  const data = users.map(user => user.reports);
  const reports = [].concat.apply([], data)

  const infos = [
    {
      title: "Total",
      data: 5,
    },
    {
      title: "Approved",
      data: 15,
    },
    {
      title: "Querried",
      data: 2,
    },
    {
      title: "Disapproved",
      data: 20,
    },
  ];

  const columns = [
    {
      selector: "photo_1",
      name: "",
      cell: row => {
        return <Item.Avatar src={row.image} variant="square" />;
      },
    },
    { selector: "message", name: "Report", sortable: true },
    { selector: "latitude", name: "Coordinates", sortable: true},
    { selector: "longitude", name: "", sortable: true},
    { selector: "status", name: "Status", sortable: true},
    {
      selector: "created_at",
      name: "Submitted",
      sortable: true,
      ignoreRowClick: true,
      cell: row => {
        return <Moment fromNow>{row.created_at}</Moment>;
      },
    },
    /* {
      selector: "status",
      name: "Status",
      ignoreRowClick: true,
      cell: row => {
        return <Item.Badge variant="standard">{row.status}</Item.Badge>;
      },
    }, */
  ];


  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header user={user} title={title.toUpperCase()} />
          <h3 className="mx-5 mt-5 mb-3 font-bold text-gray-700 text-2xl">
            Projects
          </h3>
          <div className="mx-5 flex flex-row justify-between items-center">
            {infos.map((info) => (
              <TopCards info={info} />
            ))}
          </div>
          <hr />
              <ProjectTable columns={columns} data={reports} />
         
        </div>
      </div>
    </div>
  );
}

export default Reports;
