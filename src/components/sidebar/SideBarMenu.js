import React from 'react';
import * as Icon from "react-feather";
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
    {
        title: "Overview",
        path: "/dashboard",
        icon: <MdIcons.MdPieChart />,
        classname: "nav-item"
    },
    {
        title: "Projects",
        path: "/projects",
        icon: <MdIcons.MdOutlineWork />,
        classname: "nav-item"
    },
     {
        title: "Reports",
        path: "/reports",
        icon: <MdIcons.MdLightbulb />,
        classname: "nav-item"
    }, 
    {
        title: "Users",
        path: "/users",
        icon: <MdIcons.MdSupervisorAccount />,
        classname: "nav-item"
    },
    {
        title: "Inquiries",
        path: "/inquiries",
        icon: <MdIcons.MdHelpCenter />,
        classname: "nav-item"
    },
    {
        title: "Logs",
        path: "/log",
        icon: <MdIcons.MdBook />,
        classname: "nav-item"
    },
    {
        title: "Messages",
        path: "/messages",
        icon: <MdIcons.MdChat />,
        classname: "nav-item"
    },
]

export const BottomSeidebarData = [
    {
        title: "Settings",
        path: "/settings",
        icon: <MdIcons.MdSettings />,
        classname: "nav-item"
    },
    {
        title: "Notifications",
        path: "/notifications",
        icon: <MdIcons.MdNotifications />,
        classname: "nav-item"
    },
]