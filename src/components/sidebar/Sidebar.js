import React from "react";
import Logo from "../../assets/images/logo.png";
import * as Icon from "react-feather";
import { MdLightbulb } from "react-icons/md";
import { Link } from "react-router-dom";
import {BottomSeidebarData, SidebarData} from './SideBarMenu';

export default function Sidebar() {
  return (
    <div className="sidebar-container bg-green-900">
      <div className="sidebar-content bg-green-900 mx-5 flex flex-col justify-center items-center text-white">
        <div className="sidebar-logo my-5 flex flex-row justify-center items-center">
          <img src={Logo} width="50px" alt="logo" />
          <h2 className="font ml-1">ROADZOFT</h2>
        </div>
        <nav className="nav-menu bg-green-900">
          <ul className="sidebar bg-green-900">
            {SidebarData.map((item, i) => (<li className={item.classname}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>))}
            <hr className='text-gray-100 border-gray-50 bg-gray-400' />
            {BottomSeidebarData.map((item, i) => (<li className={item.classname}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
