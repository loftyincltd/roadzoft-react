import React from 'react';
import * as Icon from 'react-feather';
import * as Item from '@mui/material';
import { useParams } from 'react-router-dom';
import { API_BASE } from '../../utils/Api';

export default function HeaderWithButton({title, handlClick}) {
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
            <div className="flex flex-row justify-center items-center">
                <h2 className="font-semibold mr-2 text-2xl">{title}</h2>
                <Item.Button onClick={handlClick} style={{borderRadius: 50}} size="small" variant="contained">Add New</Item.Button>
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
                    <p className="text-left mr-7">{user.phone} | </p>
                </div>
            </div>
        </div>
    )
}
