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

const Input = styled("input")({
  display: "none",
});

function AddUser() {
  const [project, setProject] = React.useState("");
  const [date, setDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [state, setUserstate] = React.useState("");
  const [lga, setLga] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [role, setRole] = React.useState("");
  const [roles, setRoles] = React.useState([]);
  const [user, setUser] = React.useState({});

  const handleDate = (newDate) => {
    setDate(newDate);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleProjectChange = (event) => {
    setProject(event.target.value);
  };

  const register = async () => {
    const dobYear = date.getFullYear();
    const response = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email,
        name,
        phone,
        state,
        lga,
        password: dobYear.toString(),
        dob: date,
      }),
    });
    const result = await response.json();
    console.log("Register", result);
  };

  const getRoles = async () => {
    const response = await fetch(`${API_BASE}/roles`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
    const result = await response.json();
    setRoles(result.data)
    console.log("Roles", result)
  }

  const title = "NEW USER";
  /* const user = {
    fullname: "Olusanya Michael",
    staff_id: "T64554",
    role: "Superadmin",
  }; */

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
    getRoles()
  }, [])

  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header user={user} title={title.toUpperCase()} />
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
          <form className="mx-5">
            <div className="mt-5 flex flex-row justify-evenly items-center">
              <div className="flex flex-col justify-center items-center">
                <div>
                  <TextField
                    placeholder="Type Name"
                    onChange={(e) => setName(e.target.value)}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                  />
                  <div className="my-3 flex flex-row justify-evenly items-center">
                    <TextField
                      placeholder="State"
                      onChange={(e) => setUserstate(e.target.value)}
                      id="outlined-basic"
                      label="State"
                      variant="outlined"
                    />
                    <TextField
                      placeholder="LGA"
                      onChange={(e) => setLga(e.target.value)}
                      id="outlined-basic"
                      label="LGA"
                      variant="outlined"
                    />
                  </div>
                  <div className="my-3 flex flex-row justify-evenly items-center">
                    <Box sx={{ minWidth: 200 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Role
                        </InputLabel>
                        <Select
                          disabled
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={project}
                          label="Role"
                          onChange={handleRoleChange}
                        >
                          <MenuItem value="Super Admin">Super Admin</MenuItem>
                          <MenuItem value="Admin">Admin</MenuItem>
                          <MenuItem value="Staff">Staff</MenuItem>
                          <MenuItem value="Ad-hoc">Ad-hoc</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <TextField
                      placeholder="Phone"
                      onChange={(e) => setPhone(e.target.value)}
                      id="outlined-basic"
                      label="Phone"
                      variant="outlined"
                    />
                  </div>
                  <div className="my-3 flex flex-row justify-evenly items-center">
                    <TextField
                      placeholder="Email"
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
                </div>
              </div>
              <div className="flex flex-col justify-start items-center">
                <Box className="my-5" sx={{ minWidth: 250 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Add to Project
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={project}
                      label="Project"
                      onChange={handleProjectChange}
                    >
                      <MenuItem value="Project 1">Project 1</MenuItem>
                      <MenuItem value="Project 2">Project 2</MenuItem>
                      <MenuItem value="Project 3">Project 3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Item.Button
                  onClick={register}
                  color="primary"
                  variant="contained"
                >
                  Regiter
                </Item.Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
