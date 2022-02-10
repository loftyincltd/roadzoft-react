import React from "react";
import * as Icon from "react-feather";
import * as Item from "@mui/material";
import { useParams, useHistory, Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { API_BASE } from "../../utils/Api";
import SwitchDialogDemo from "./Switch";

export default function Header({ title, user }) {
  const params = useParams();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    history.push("/");
  };

  return (
    <div className="header-container flex flex-row justify-between items-center px-5 ">
      <div>
        <h2 className="font-semibold text-2xl">{title}</h2>
      </div>
      <div className="search-container">
        <div className="search-wrapper center-item">
          <Icon.Search size={16} className="search-icon" />
          <input className="search-input" type="text" placeholder="" />
        </div>
      </div>
      <SwitchDialogDemo />

      <span className="text-3xl text-gray-200 mr-5">|</span>

      <div className=" flex flex-row justify-between items-center">
        <Badge variant="dot" color="primary">
          <Icon.Bell
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/notifications")}
            className="p-1"
          />
        </Badge>
      </div>

      <div className="user-info-wrapper">
        <Link
        style={{fontSize: "small", textAlign: "right"}}
          to={`/user-profile/${user.id}`}
          className="flex flex-col justify-right items-right"
        >
          <p style={{ fontWeight: "bolder", textAlign: "right"}}>
            {user.name}
          </p>
          <p style={{ textAlign: "right"}}>{user.phone}</p>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center">
        <Item.Avatar
          variant="circular"
          src={`https://roadzoftserver.xyz/uploads/avatar/${
            user.photos == null ? "" : user.photos.photo
          }`}
        />
        {localStorage.getItem("user") && (
          <p
            onClick={handleLogout}
            style={{
              cursor: "pointer",
              textAlign: "right",
              color: "tomato",
            }}
            className=""
          >
            Logout
          </p>
        )}
      </div>
    </div>
  );
}
