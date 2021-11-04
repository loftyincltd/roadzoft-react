import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import * as Icon from "@mui/icons-material";
import * as Item from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { API_BASE } from "../utils/Api";
import { useParams } from "react-router-dom";
import ProjectTable from "../components/tables/ProjectTable";
import ReportModal from "../components/modals/ReportModal"

const Input = styled("input")({
  display: "none",
});

function SingleUser() {
  const params = useParams();
  const [user, setUser] = React.useState({});
  const [project, setProject] = React.useState("");
  const [date, setDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [state, setUserstate] = React.useState("");
  const [lga, setLga] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [projectId, setProjectId] = React.useState("");
  const [role, setRole] = React.useState("");
  const [roles, setRoles] = React.useState([]);
  const [userRoles, setUserRoles] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [userProjects, setUserProjects] = React.useState([]);
  const [userReports, setUserReports] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  //Handle changes
  const handleDate = (newDate) => {
    setDate(newDate);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleProjectChange = (event) => {
    setProjectId(event.target.value);
  };

  //Update User account
  const updateUser = async () => {
    const dobYear = date.getFullYear();
    const response = await fetch(`${API_BASE}/user/update/${localStorage.getItem("user")}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email,
        name,
        phone,
        state,
        lga,
        dob: date,
      }),
    });
    const result = await response.json();
    setMessage(result.message)
    console.log("Register", result);
  };
  //Get roles
  const getRoles = async () => {
    const response = await fetch(`${API_BASE}/roles`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    setRoles(result.data);
    console.log("Roles", result);
  };
  //Get projects
  const getProjects = async () => {
    try {
      const response = await fetch(`${API_BASE}/projects`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setProjects(result);
      console.log("Projects", result);
    } catch (error) {
      console.log(error);
    }
  };

  //Get user reports
  const getUserReports = async () => {
    try {
      const response = await fetch(`${API_BASE}/user/${localStorage.getItem("user")}/reports`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setUserReports(result.data);
      console.log("Reports", result);
    } catch (error) {
      console.log(error);
    }
  };
  //header user
  const title = "USER DETAILS";

  //Get single user
  const getUser = async () => {
    const userId = params.id;
    try {
      const response = await fetch(`${API_BASE}/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      const data = result.data;
      setUser(result.data);
      setName(data.name);
      setDate(data.dob);
      setUserstate(data.State);
      setEmail(data.email);
      setLga(data.lga);
      setPhone(data.phone);
      setUserId(data.id);
      setRole(data.roles[0]);
      setUserRoles(data.roles);
      setUserReports(data.reports);
      setLoading(false);
      console.log("User:", result);
    } catch (error) {
      console.log(error);
    }
  };

  //Assign Role
  const addRole = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/roles/assign/role/${role}/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setMessage("Role Added Successfully");
      }
      console.log("Assign", result);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

   //Detach Role
   const detachRole = async (id) => {
    try {
      const response = await fetch(
        `${API_BASE}/roles/detach/role/${id}/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setMessage("Role Detached Successfully");
      }
      console.log("Detach", result);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  //Assign Project
  const addProject = async () => {
    try {
      console.log("Project Id", projectId);
      const response = await fetch(
        `${API_BASE}/project/${projectId}/assign/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      console.log("Assign Project", result);
      if (result.success) {
        setMessage("Project Added Successfully");
      }

      getProjects();
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const userReportz = user.reports

  const handleApprove = async (id) => {
    const response = await fetch(`${API_BASE}/report/${id}/action/0`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    getUserReports()
  }

  const handleReject = async (id) => {
    const response = await fetch(`${API_BASE}/report/${id}/action/1`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    getUserReports()
  }

  React.useEffect(() => {
    getRoles();
    getProjects();
    getUser();
    getUserReports()
  }, []);

  const rolecolumns = [
    { selector: "name", name: "Roles", sortable: true },
    {
      selector: "id",
      name: "",
      cell: (row) => {
        return (
          <Item.Button
            onClick={() => detachRole(row.id)}
            color="warning"
            variant="contained"
          >
            Detach
          </Item.Button>
        );
      },
    },
  ]
  const projectcolumns = [
    { selector: "title", name: "Projects", sortable: true },
  ]
  const reportcolumns = [
    { selector: "message", name: "Reports", sortable: true },
    { selector: "latitude", name: "Coordinates", sortable: true, 
    cell: (row) => {
      return (
        <div>
          <p><span className="text-bolder">Lat: </span>{row.latitude},</p>
          <p><span className="text-bolder">Long: </span>{row.longitude}</p>
        </div>
      );
    },
  },
  { selector: "status", name: "", sortable: true },
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
  ]

  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header user={user} title={title.toUpperCase()} />
          {message != "" && (
            <Item.Alert
              onClose={() => setMessage("")}
              variant="filled"
              color="info"
            >
              {message}
            </Item.Alert>
          )}
          <div className="profile-picture flex flex-col justify-center items-center">
            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <Item.Avatar
                    style={{ height: 90, width: 90 }}
                    variant="circular"
                  />
                </IconButton>
              </label>
            </Stack>
            <p>Tap to add profile picture (optional)</p>
          </div>
          {loading ? (
            <Item.Box
              className="flex justify-center items-center"
              sx={{ display: "flex" }}
            >
              <Item.CircularProgress />
            </Item.Box>
          ) : (
            <form className="mx-5">
              <div className="mt-5 flex flex-row justify-evenly items-center">
                <div className="flex flex-col justify-center items-center">
                  <div>
                    <div className="my-3 flex flex-row justify-evenly items-center">
                      <TextField
                        placeholder="Type Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                      />
                      <TextField
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        id="outlined-basic"
                        label="Phone"
                        variant="outlined"
                      />
                    </div>
                    <div className="my-3 flex flex-row justify-evenly items-center">
                      <TextField
                        placeholder="State"
                        value={state}
                        onChange={(e) => setUserstate(e.target.value)}
                        id="outlined-basic"
                        label="State"
                        variant="outlined"
                      />
                      <TextField
                        placeholder="LGA"
                        value={lga}
                        onChange={(e) => setLga(e.target.value)}
                        id="outlined-basic"
                        label="LGA"
                        variant="outlined"
                      />
                    </div>
                    <div className="my-3 flex flex-row justify-evenly items-center"></div>
                    <div className="my-3 flex flex-row justify-evenly items-center">
                      <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                      />

                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DesktopDatePicker
                            label="Date of Birth"
                            inputFormat="MM/dd/yyyy"
                            value={date}
                            onChange={handleDate}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </div>
                    <Item.Button
                      onClick={updateUser}
                      color="primary"
                      variant="contained"
                    >
                      Update User
                    </Item.Button>
                  </div>
                  <ProjectTable columns={reportcolumns} data={userReports} />
                  <ProjectTable columns={projectcolumns} data={projects} />
                  <ProjectTable columns={rolecolumns} data={userRoles} />
                </div>

                <div className="flex flex-col justify-start items-center">
                  <div className="flex flex-col justify-start items-center">
                    <Box className="my-5" sx={{ minWidth: 250 }}>
                    
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Add to Project
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={projectId}
                          label="Project"
                          onChange={handleProjectChange}
                        >
                          {projects &&
                            projects.map((pro, i) => (
                              <MenuItem value={pro.id}>{pro.title}</MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Item.Button
                      onClick={addProject}
                      color="primary"
                      variant="contained"
                    >
                      Update Project
                    </Item.Button>
                  </div>
                  <div className="flex flex-col justify-start items-center my-5">
                    <Box sx={{ minWidth: 200 }}>
                    
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Role
                        </InputLabel>
                        <Select
                          className="my-3"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue={userRoles[0]}
                          label="Role"
                          onChange={handleRoleChange}
                        >
                          {roles &&
                            roles.map((ro, i) => (
                              <MenuItem value={ro.id} key={i}>
                                {ro.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Item.Button
                      onClick={addRole}
                      color="primary"
                      variant="contained"
                    >
                      Update Role
                    </Item.Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleUser;
