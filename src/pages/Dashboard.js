import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import {API_BASE} from '../utils/Api'

function Dashboard() {
  const title = "Overview";
  const user = {
    fullname: "Olusanya Michael",
    staff_id: "T64554",
    role: "Superadmin",
  };

  const getData = async () => {
    const response = fetch(`${API_BASE}/`)
  }

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

  const reports = [
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
  const titles = [
    {name: "Unresolved biodata requests"},
    {name: "Latest Reports"},
    {name: "Latest Messages"},
    {name: "New Users"},
]
  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header title={title.toUpperCase()} />
          <h3 className="mx-5 mt-5 mb-3 font-bold text-gray-700 text-2xl">Projects</h3>
          <div className="mx-5 flex flex-row justify-between items-center">
            {infos.map((info) => (
              <TopCards info={info} />
            ))}
          </div>
          <h3 className="mx-5 mt-3 mb-3 font-bold text-gray-700 text-2xl">Reports</h3>
          <div className="mx-5 flex flex-row justify-between items-center">
            {reports.map((report) => (
              <TopCards info={report} />
            ))}
          </div>
          <div className="main-items grid grid-cols-2 gap-4 my-3 mx-5">
              {titles.map((item, i) => <LargeCard title={item}/>)}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
