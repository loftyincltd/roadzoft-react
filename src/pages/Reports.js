import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import * as Item from "@mui/material";
import Moment from "react-moment";
import ProjectTable from "../components/tables/ProjectTable";
import { API_BASE } from "../utils/Api";
import ReportModal from "../components/modals/ReportModal";

function Reports() {
  const [user, setUser] = React.useState({});
  const [reports, setReports] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const title = "REPORTS";

  const handleApprove = async (id) => {
    const response = await fetch(`${API_BASE}/report/${id}/action/0`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    getReports()
  }

  const handleReject = async (id) => {
    const response = await fetch(`${API_BASE}/report/${id}/action/1`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    getReports()
  }

  const getReports = async () => {
    const response = await fetch(`${API_BASE}/reports`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setReports(result.data);
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
      setUser(data);
      console.log("User:", result);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUser();
    getReports();
    /* const data = users.map(user => user.reports);
    console.log("Reports", [].concat.apply([], data)) */
  }, []);

  //const data = users.map(user => user.reports);
  //const reports = [].concat.apply([], data)

  const infos = [
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
      data: reports.filter((report) => report.status === "Rejected").length,
    },
  ];

  const columns = [
    {
      selector: "photo_1",
      name: "",
      cell: (row) => {
        return (
          <Item.Avatar
            src={`https://roadzoftserver.xyz/uploads/${row.photo_1}`}
            variant="square"
          />
        );
      },
    },
    { selector: "message", name: "Report", sortable: true, cell: (row) => {
      return row.message == null ? <span>N/A</span> : <span>{row.message}</span>;
    } },
    { selector: "latitude", name: "Coordinates", sortable: true },
    { selector: "longitude", name: "", sortable: true },
    { selector: "status", name: "Status", sortable: true },
    {
      selector: "created_at",
      name: "Submitted",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return <Moment fromNow>{row.created_at}</Moment>;
      },
    },
    {
      selector: "id",
      name: "Submitted",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return (
          <ReportModal
            status={row.status}
            photo1={`https://roadzoftserver.xyz/uploads/${row.photo_1}`}
            photo2={`https://roadzoftserver.xyz/uploads/${row.photo_2}`}
            photo3={`https://roadzoftserver.xyz/uploads/${row.photo_3}`}
            photo4={`https://roadzoftserver.xyz/uploads/${row.photo_4}`}
            latitude={row.latitude}
            longitude={row.longitude}
            approve={() => handleApprove(row.id)}
            reject={() => handleReject(row.id)}
          />
        );
      },
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
          <h3 className="mx-5 mt-5 mb-3 font-bold text-gray-700 text-2xl">
            Reports
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
