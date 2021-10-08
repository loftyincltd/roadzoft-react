import React from 'react';
import * as Icon from 'react-feather';
import * as Item from '@mui/material'

export default function HeaderWithButton({title, profile, handlClick}) {
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
                        <span className="mr-2">{profile.fullname}</span>
                        <Item.Avatar variant="circular" />
                    </div>
                    <p className="text-left mr-7">{profile.staff_id} | {profile.role}</p>
                </div>
            </div>
        </div>
    )
}
