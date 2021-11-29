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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { CSVLink } from "react-csv";
import Fuse from "fuse.js";
import * as Icons from "react-feather";
import ReportQuery from "../components/modals/ReportQuery";
import InquiryModal from "../components/modals/InquiryModal";
import { useHistory } from "react-router-dom";

function Inquiry() {
  const [user, setUser] = React.useState({});
  const [inquiries, setInquiries] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const countPerPage = 20;
  const [filterTerm, setFilterTerm] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const history = useHistory();

  const title = "Inquiry";

  const getInquiry = async () => {
    const response = await fetch(`${API_BASE}/inquiries?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setInquiries(result.data.data);
    setTotalPages(result.data.total)
    setLoading(false);
    console.log("Inquiry", result);
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
    getInquiry();
    getUser();
  }, []);
  React.useEffect(() => {
    getInquiry();
  }, [page]);

  const data = React.useMemo(() => inquiries);

  const fuse = new Fuse(data, {
    threshold: 0.5,
    includeMatches: true,
    keys: [
      "message",
      "user.State",
      "user.lga",
      ["user.projects"],
      "user.projects.title",
    ],
  });
  const results = fuse.search(filterTerm);
  console.log("result", results);
  const filterResults = results.map((item) => item.item);

  const headers = [
    { label: "Message", key: "message" },
    { label: "Longitude", key: "longitude" },
    { label: "Latitude", key: "latitude" },
    { label: "User", key: "user.name" },
  ];

  const csvData =
    filterTerm == ""
      ? data.map((row) => ({
          ...row,
          users: JSON.stringify(row.users),
        }))
      : filterResults.map((row) => ({
          ...row,
          users: JSON.stringify(row.users),
        }));

  const csvReport = {
    data: csvData,
    headers: headers,
    filename: `${Date.now()}_Project_Report.csv`,
  };

  const modalcolumns = [
    { selector: "comment", name: "Comment", sortable: true },
    {
      selector: "created_at",
      name: "Date",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return <Moment fromNow>{row.created_at}</Moment>;
      },
    },
    {
      selector: "id",
      name: "",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return (
          <Item.Button
            onClick={() => history.push(row.user_id)}
            color="primary"
            variant="outlined"
          >
            View User
          </Item.Button>
        );
      },
    },
  ];

  const columns = [
    {
      selector: "message",
      name: "Inquiry",
      sortable: true,
      cell: (row) => {
        return row.message == null ? (
          <span>N/A</span>
        ) : (
          <span>{row.message}</span>
        );
      },
    },
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
      name: "",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return (
          <div>
            <InquiryModal message={row.message} userId={row.user_id} />
          </div>
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
          <hr />
          <div className="my-3 flex flex-row justify-evenly items-center">
            <h3>Filter: </h3>

            <CSVLink className="flex flex-row" {...csvReport}>
              {" "}
              <Icons.Download /> Export Data
            </CSVLink>
          </div>
          <hr />
          <ProjectTable
            columns={columns}
            data={filterTerm != "" ? filterResults : data}
            total={totalPages}
            countPerPage={countPerPage}
            changePage={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default Inquiry;
