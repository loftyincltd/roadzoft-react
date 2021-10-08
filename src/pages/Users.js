import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import * as Item from "@mui/material";
import Moment from "react-moment";
import ProjectTable from "../components/tables/ProjectTable";
import HeaderWithButton from "../components/header/HeaderWithButton";
import { API_BASE } from "../utils/Api";
import {useHistory} from 'react-router-dom';

function Users() {
  const history = useHistory()
  const [users, setUsers] = React.useState([]);

  const getUsers = async () => {
    const response = await fetch(`${API_BASE}/users`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      },
    });
    const result = await response.json();
    result && setUsers(result.data)
    console.log("Users", result)
  };

  React.useEffect(() => {
      getUsers()
  }, []);

  const data = React.useMemo(() => users)

  const handleNew = () => {
    history.push('/add-user')
  }
  const title = "USERS";
  const user = {
    fullname: "Olusanya Michael",
    staff_id: "T64554",
    role: "Superadmin",
  };

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
    { selector: "name", name: "Full Name", sortable: true },
    { selector: "role", name: "Role", sortable: true },
    { selector: "State", name: "State", sortable: true },
    { selector: "lga", name: "LGA", sortable: true },
  ];

 
  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <HeaderWithButton handlClick={handleNew} title={title.toUpperCase()} profile={user} />
          <ProjectTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}

export default Users;
