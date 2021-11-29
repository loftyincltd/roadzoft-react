import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import MessageHeader from "../components/header/MessagesHeader";
import Sidebar from "../components/sidebar/Sidebar";
import { API_BASE } from "../utils/Api";
import ProjectTable from "../components/tables/ProjectTable";
import * as Item from "@mui/material";
import NewMessage from "../components/modals/NewMessage";
import ReadMessage from "../components/modals/ReadMessage";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";

function Messages() {
  const history = useHistory();
  const [user, setUser] = React.useState({});
  const [messages, setMessages] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const countPerPage = 20;
  const [loading, setLoading] = React.useState(false);
  const [hide, setHide] = React.useState(false);
  const [newtitle, setTitle] = React.useState("");
  const [newbody, setBody] = React.useState("");
  const title = "Messages";

  const getMessages = async () => {
    const response = await fetch(`${API_BASE}/messages?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setMessages(result.data.data);
    setTotalPages(result.data.total)
    setLoading(false);
    console.log("Messages", result);
  };

  const columns = [
    {
      selector: "image",
      name: "",
      cell: (row) => {
        return <Item.Avatar src={row.image} variant="circular" />;
      },
    },
    { selector: "title", name: "Inbox", sortable: true },
    {
      selector: "created_at",
      name: "Date",
      sortable: true,
      cell: (row) => {
        return <Moment fromNow>{row.created_at}</Moment>;
      },
    },
    {
      selector: "id",
      name: "",
      cell: (row) => {
        return <ReadMessage title={row.title} body={row.body} />;
      },
    },
  ];

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
      setUser(result.data);
      console.log("User:", result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    console.log("Close");
    getMessages();
    setHide(true);
  };

  React.useEffect(() => {
    getUser();
    getMessages();
  }, []);
  React.useEffect(() => {
    getMessages();
  }, [page]);
  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <MessageHeader user={user} title={title.toUpperCase()} />
          <div className="flex flex-row justify-between items-center mx-5">
            <h3 className="mx-5 mt-5 mb-3 font-bold text-gray-700 text-2xl">
              Inbox({messages.length})
            </h3>
            {hide == false && (
              <NewMessage close={handleClose} onClick={() => setHide(false)} />
            )}
          </div>

          <div className="main-items mx-5">
            <div>
              <ProjectTable
                data={messages}
                columns={columns}
                total={totalPages}
                countPerPage={countPerPage}
                changePage={(page) => setPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
