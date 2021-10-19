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
import { useHistory } from "react-router-dom";

function Users() {
  const history = useHistory();
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState({});

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

  const handleDelete = async (id) => {
    const response = await fetch(`${API_BASE}/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    getUsers();
    console.log("Projects", result);
  };


  React.useEffect(() => {
    getUser()
    getUsers();
  }, []);

  const data = React.useMemo(() => users);

  const handleNew = () => {
    history.push("/add-user");
  };
  const viewUser = (id) => {
    history.push(`/user-profile/${id}`);
  };
  const title = "USERS";
  

  const columns = [
    { selector: "name", name: "Full Name", sortable: true },
    { selector: "State", name: "State", sortable: true },
    { selector: "lga", name: "LGA", sortable: true },
    {
      selector: "id",
      name: "",
      cell: (row) => {
        return (
          <Item.Button
            onClick={() => viewUser(row.id)}
            color="success"
            variant="contained"
          >
            View
          </Item.Button>
        );
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
            onClick={() => handleDelete(row.id)}
            color="error"
            variant="contained"
          >
            Delete
          </Item.Button>
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
          <HeaderWithButton
            handlClick={handleNew}
            title={title.toUpperCase()}
            user={user}
          />
          {loading ? (
            <Item.Box
              className="flex justify-center items-center"
              sx={{ display: "flex" }}
            >
              <Item.CircularProgress />
            </Item.Box>
          ) : (
            <ProjectTable columns={columns} data={data} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
