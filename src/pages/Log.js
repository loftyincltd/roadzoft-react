import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import {API_BASE} from '../utils/Api'
import ProjectTable from "../components/tables/ProjectTable";
import * as Item from "@mui/material"

function Log() {
  const [user, setUser] = React.useState({})
  const title = "Logs";


  const getData = async () => {
    const response = fetch(`${API_BASE}/`)
  }
  const columns = [
    {
      selector: "image",
      name: "Image",
      cell: row => {
        return <Item.Avatar src={row.image} variant="circular" />;
      },
    },
    { selector: "activity", name: "Activity", sortable: true },
    { selector: "date", name: "Date", sortable: true},
    { selector: "time", name: "Time", sortable: true},
    
    
  ];
  const data = [
    {activity: "Femi Created a Project", date: "2009-12-23", time: "12:00", image: "#"},
    {activity: "Femi Created a Project", date: "2009-12-23", time: "12:00", image: "#"},
    {activity: "Femi Created a Project", date: "2009-12-23", time: "12:00", image: "#"},
    {activity: "Femi Created a Project", date: "2009-12-23", time: "12:00", image: "#"},
    {activity: "Femi Created a Project", date: "2009-12-23", time: "12:00", image: "#"}  
]
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
    setUser(result.data)
    console.log("User:", result);
  } catch (error) {
    console.log(error);
  }
};

React.useEffect(() => {
  getUser()
}, [])
  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header user={user} title={title.toUpperCase()} />
         
          <div className="main-items mx-5">
              <div>
                <ProjectTable data={data} columns={columns} />
              </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Log;
