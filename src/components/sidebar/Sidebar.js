import React from "react";
import Logo from "../../assets/images/logo.png";
import * as Icon from "react-feather";
import * as Item from "@mui/material";
import { MdLightbulb } from "react-icons/md";
import { Link } from "react-router-dom";
import { BottomSeidebarData, SidebarData } from "./SideBarMenu";
import { useHistory } from "react-router-dom";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

export default function Sidebar() {
  const history = useHistory();
  const [open, setOpen] = React.useState(true);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    history.push("/");
  };
  return (
    <>
      <div
        className={
          open ? "sidebar-container block bg-green-900 h-screen" : "hidden"
        }
      >
        <div className="sidebar-container bg-green-900">
          <div className="sidebar-content bg-green-900 mx-5 flex flex-col justify-center items-center text-white">
            <div className="sidebar-logo my-5 flex flex-row justify-center items-center">
              <img className="ml-5" src={Logo} width="50px" alt="logo" />
              <h2 className="font ml-1 mr-auto">ROADZOFT</h2>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(false)}
                className="flex text-right flex-row justify-end items-end mr-1 ml-auto"
              >
                {/* <ToggleOnIcon color="inherit" /> */}
              </div>
            </div>
            <nav className="nav-menu bg-green-900">
              <ul className="sidebar bg-green-900">
                {SidebarData.map((item, i) => (
                  <li className={item.classname}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
                 <div className="px-5">
                <hr className="text-green-100 border-green-400 bg-green-400 " />
                </div>
                {BottomSeidebarData.map((item, i) => (
                  <li className={item.classname}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-row justify-center items-center">
                <Item.Button
                  onClick={handleLogout}
                  color="success"
                  variant="outlined"
                >
                  Logout
                </Item.Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div
        className={
          open ? "hidden" : "sidebar-container2 block bg-green-900 h-screen"
        }
      >
        <div className="sidebar-container2 h-screen bg-green-900">
          <div className="sidebar-content bg-green-900 mx-5 flex flex-col justify-center items-center text-white">
            <div className="sidebar-logo my-5 flex flex-row justify-center items-center">
              <img className="mr-5 ml-5" src={Logo} width="50px" alt="logo" />
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(true)}
                className="flex text-gray-200 text-right flex-row justify-end items-end"
              >
               {/*  <ToggleOffIcon style={{ fill: "gray" }} /> */}
              </div>
            </div>
            <nav className="nav-menu bg-green-900">
              <div className="sidebar bg-green-900">
                {SidebarData.map((item, i) => (
                  <p className={item.classname2}>
                    <Link to={item.path}>{item.icon}</Link>
                  </p>
                ))}
                <div className="">
                <hr className="text-green-100 border-green-50 bg-green-400 px-5" />
                </div>
                
                {BottomSeidebarData.map((item, i) => (
                  <p className={item.classname2}>
                    <Link to={item.path}>{item.icon}</Link>
                  </p>
                ))}
              </div>
              <div className="flex flex-row justify-center items-center">
                <Item.Button
                  onClick={handleLogout}
                  color="success"
                  variant="outlined"
                >
                  Logout
                </Item.Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
