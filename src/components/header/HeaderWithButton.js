import React from 'react';
import * as Icon from 'react-feather';
import * as Item from '@mui/material';
import { useParams, useHistory, Link } from 'react-router-dom';
import { API_BASE } from '../../utils/Api';
import Badge from '@mui/material/Badge';

export default function HeaderWithButton({title, user, handlClick}) {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("roles")
        history.push("/")
      }

   
    return (
        <div className="header-container flex flex-row justify-between items-center mx-5 my-2">
            <div className="flex flex-row justify-center items-center">
                <h2 className="font-semibold mr-2 text-2xl">{title}</h2>
                <Item.Button onClick={handlClick} style={{borderRadius: 50}} size="small" variant="contained">Add New</Item.Button>
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className="mr-8 flex flex-row justify-between items-center">
                <Badge variant="dot" color="primary">
                {/* <Icon.Search className="p-1 mr-5" />  */}<Icon.Bell style={{cursor: 'pointer'}}  onClick={() => history.push("/notifications")} className="p-1" />
                </Badge>
                </div>
                <span className="text-3xl text-gray-200 mr-5">|</span>
                <div>
                    <Link to={`/user-profile/${user.id}`} className="flex flex-row justify-evenly items-center">
                        <span className="mr-2">{user.name}</span>
                        <Item.Avatar variant="circular" src={`https://roadzoftserver.xyz/uploads/avatar/${user.photos == null ? "" : user.photos.photo}`}  />
                    </Link>
                    <div className="flex flex-row justify-evenly items-center">
                    <p className="text-left mr-7">{user.phone}</p>
                    {localStorage.getItem('user') && <p onClick={handleLogout} style={{cursor: 'pointer', textAlign: 'right', color: "tomato"}} className="text-left mr-7">Logout</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
