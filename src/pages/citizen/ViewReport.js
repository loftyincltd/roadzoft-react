import React from "react";
import * as Item from "@mui/material";
import SingleReport from "../../components/reports/SingleReport";
import Header from "../../components/header/Header";
import CitizenSidebar from "../../components/sidebar/CitizenSidebar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { API_BASE } from "../../utils/Api";
import MapModal from "../../components/modals/MapModal";

const ViewReport = () => {
  const [user, setUser] = React.useState({});
  const [reports, setReports] = React.useState([]);
  const [report, setReport] = React.useState([]);
  const [reportsData, setReportsData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(2);
  const [countPerPage, setCountPerPage] = React.useState(10);
  const [filterTerm, setFilterTerm] = React.useState("");
  const [projects, setProjects] = React.useState([]);
  const [project, setProject] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [state, setUserstate] = React.useState("");
  const [lga, setLga] = React.useState("");
  const [projectId, setProjectId] = React.useState("");
  const [searchData, setSearchData] = React.useState([]);
  const [commentz, setCommentz] = React.useState([]);
  const [pending, setPending] = React.useState([]);
  const [approved, setApproved] = React.useState([]);
  const [queried, setQuried] = React.useState([]);
  const [rejected, setRejected] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const title = "View Report";

  const getComments = async (uuid) => {
    const response = await fetch(`${API_BASE}/queried/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setCommentz(result.data);
    console.log("Comments", result);
  };

  const handleApproved = async (term) => {
    setLoading(true);
    const response = await fetch(`${API_BASE}/reports/${term}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-RGM-PLATFORM": "Ad-hoc",
      },
    });
    const result = await response.json();
    result && setReports(result.data.data);
    getReports();
    setLoading(false);
    console.log("Approved", result);
  };

  const getReports = async () => {
    const response = await fetch(`${API_BASE}/reports?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-RGM-PLATFORM": "Ad-hoc",
      },
    });
    const result = await response.json();
    result && setReports(result.data.data);
    setLoading(false);
    console.log("Reports", result);
  };

  React.useEffect(() => {
    getReports();
  }, []);

  const reportData = React.useMemo(() => reports);
  const reportId = 15;
  const newReport = reportData.find((report) => report.id == reportId);

  return (
    <div>
      <div>
        <div className="flex flex-row">
          <div className="dashboard-left">
            <CitizenSidebar />
          </div>

          <div className="dashboard-right">
            <Header title={title} user={user} />

            <hr />
            {loading ? (
              <Box
                className="flex justify-center items-center"
                sx={{ display: "flex" }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <div className="bg-white shadow-sm rounded-md mx-2 my-5 p-5 text-green-800">
                <div className="flex flex-row justify-end items-end">
                  <Item.Button
                    sizes="small"
                    color="secondary"
                    variant="contained"
                  >
                    <span className="capitalize">{newReport.status}</span>
                  </Item.Button>
                </div>
                <div className="flex flex-row justify-start items-center">
                  <div className="w-full mx-1">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        Report Title
                      </span>
                      <div className="search-wrapper">
                        <input
                          className="search-input text-sm py-2 pl-3 w-full"
                          type="text"
                          placeholder=""
                          value={newReport.message}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full mx-1">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        Submitted by
                      </span>
                      <div className="search-wrapper">
                        <input
                          className="search-input text-sm py-2 pl-3 w-full"
                          type="text"
                          placeholder=""
                          value={newReport.user.name}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center">
                  <div className="w-full mx-1">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Report Id</span>
                      <div className="search-wrapper">
                        <input
                          className="search-input text-sm py-2 pl-3 w-full"
                          type="text"
                          placeholder=""
                          value={newReport.id}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full mx-1">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Email</span>
                      <div className="search-wrapper">
                        <input
                          className="search-input text-sm py-2 pl-3 w-full"
                          type="text"
                          placeholder=""
                          value={newReport.user.email}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center">
                  <div className="w-full mx-1">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Location</span>
                      <div className="search-wrapper">
                        <input
                          className="search-input text-sm py-2 px-3 w-full"
                          type="text"
                          placeholder=""
                          value={`${newReport.user.lga}, ${newReport.user.State}`}
                        />

                        <MapModal
                          apiKey="pk.eyJ1IjoibWljaG9sdXNhbnlhIiwiYSI6ImNrd3MybWM4YjEyOGwycHFvaDhsc2Z2Y3AifQ.uSFsVJGkOiUXSTG2SOES2A"
                          latitude={parseFloat(newReport.latitude)}
                          longitude={parseFloat(newReport.longitude)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full mx-1">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Submitted</span>
                      <div className="search-wrapper">
                        <input
                          className="search-input text-sm py-2 pl-3 w-full"
                          type="text"
                          placeholder=""
                          value={`${new Date(newReport.created_at).getDate()}/${
                            new Date(newReport.created_at).getMonth() + 1
                          }/${new Date(newReport.created_at).getFullYear()}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="report-images my-5">
                  <p className="text-sm text-gray-500">Attached Photos</p>
                  <div className="flex lg:flex-row md:flex-row sm:flex-col justify-between items-center">
                    <div>
                      <img
                        src={`https://roadzoftserver.xyz/uploads/${newReport.photo_1}`}
                        width="200px"
                        height="200px"
                        alt="Reprot Image"
                      />
                    </div>
                    <div>
                      <img
                        src={`https://roadzoftserver.xyz/uploads/${newReport.photo_2}`}
                        width="200px"
                        height="200px"
                        alt="Reprot Image"
                      />
                    </div>
                    <div>
                      {newReport.photo_3 != null && (
                        <img
                          src={`https://roadzoftserver.xyz/uploads/${newReport.photo_3}`}
                          width="200px"
                          height="200px"
                          alt="Reprot Image"
                        />
                      )}
                    </div>
                    <div>
                      {newReport.photo_4 != null && (
                        <img
                          src={`https://roadzoftserver.xyz/uploads/${newReport.photo_4}`}
                          width="200px"
                          height="200px"
                          alt="Reprot Image"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="report-button my-5">
                  <div className="flex flex-row justify-evenly items-center">
                    <Item.Button variant="outlined" color="error">
                      <span className="capitalize text-sm">Reject Report</span>
                    </Item.Button>
                    <Item.Button
                      onClick={handleToggle}
                      variant="contained"
                      color="success"
                    >
                      <span className="capitalize text-sm">
                        Approve for Inspection
                      </span>
                    </Item.Button>
                  </div>
                </div>
                <div>
                  <Item.Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={open}
                    onClick={handleClose}
                  >
                    <div className="flex flex-col justify-center items-center p-5 w-1/5 shadow-md rounded-md bg-white">
                      <div>
                        <p className="text-sm text-center text-black">Approve this report for physical inspection?</p>
                      </div>
                      <div className="flex flex-row justify-items-between items-center mt-5">
                        <div className="w-1/2 mr-2">
                        <Item.Button onClick={handleClose} size="small" variant="outlined" color="success">
                          <span className="capitalize text-sm">
                            No
                          </span>
                        </Item.Button>
                        </div>
                        <div className="w-1/2 mr-2">
                        <Item.Button onClick={() => handleApproved(newReport.id)} size="small"
                          variant="contained"
                          color="success"
                        >
                          <span className="capitalize text-sm">
                            Yes
                          </span>
                        </Item.Button>
                        </div>
                      </div>
                    </div>
                  </Item.Backdrop>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
