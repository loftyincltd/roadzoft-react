import React from 'react';
import * as Icon from 'react-feather';
import * as Item from '@mui/material';
import { useParams } from 'react-router-dom';
import { API_BASE } from '../../utils/Api';

export default function Header({title}) {
    const [user, setUser] = React.useState({});
    const params = useParams();


    const getUser = async () => {
        const userId = params.id;
        try {
          const response = await fetch(`${API_BASE}/user/${localStorage.getItem("userId")}`, {
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
        <div className="header-container flex flex-row justify-between items-center mx-5 my-2">
            <div>
                <h2 className="font-semibold text-2xl">{title}</h2>
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className="mr-8 flex flex-row justify-between items-center">
                <Icon.Search className="p-1 mr-5" /> <Icon.Bell className="p-1" />
                </div>
                <span className="text-3xl text-gray-200 mr-5">|</span>
                <div>
                    <div className="flex flex-row justify-evenly items-center">
                        <span className="mr-2">{user.name}</span>
                        <Item.Avatar variant="circular" />
                    </div>
                    <p className="text-left mr-7">{user.phone} | {user.roles[0].name}</p>
                </div>
            </div>
        </div>
    )
}
