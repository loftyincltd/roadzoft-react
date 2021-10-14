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
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { API_BASE } from "../utils/Api";

const Input = styled("input")({
  display: "none",
});

function CreateProject() {
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [description, setDesc] = React.useState("");
  const [user, setUser] = React.useState({});

  const postProject = async () => {
    const response = await fetch(`${API_BASE}/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    const result = await response.json();
    if (result) {
        setMessage("Published Successfully")
    } else {
        setMessage("Error Publishing Project")
    }
    console.log("Project Post", result);
  };

  const page_title = "CREATE PROJECT";
 /*  const user = {
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
  }, [])

  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header user={user} title={page_title.toUpperCase()}/>

          <form className="mx-5">
            <div className="mt-5 flex flex-col justify-evenly items-center">
              <div className="shadow rounded bg-gray-200 p-10 flex flex-col justify-center items-center">
                <div>
                  <TextField
                  style={{ width: 700, background: "white" }}
                    placeholder="Type Name"
                    onChange={(e) => setTitle(e.target.value)}
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                  />
                </div>
                <div className="my-5">
                  <TextareaAutosize
                    maxRows={4}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    defaultValue="Description"
                    onChange={(e) => setDesc(e.target.value)}
                    style={{ width: 700, height: 300 }}
                  />
                </div>
                <div>
                  <Item.Button
                    onClick={postProject}
                    color="primary"
                    variant="contained"
                  >
                    Publish
                  </Item.Button>
                </div>
                <div>
                    {message && <Item.Alert className="my-5" color="info" variant="filled">{message}</Item.Alert>}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
