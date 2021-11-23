import React from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment'

export default function LargeProjectsCard({title, data, link}) {
 /*  const data = [
    {
      name: "Olusanya Michael",
      date: "12/20/2020",
    },
    {
      name: "Olusanya Michael",
      date: "12/20/2020",
    },
    {
      name: "Olusanya Michael",
      date: "12/20/2020",
    },
    {
      name: "Olusanya Michael",
      date: "12/20/2020",
    },
  ]; */
  
  return (
    <>
      <div className="card-large-wrapper bg-white shadow-sm rounded-sm flex flex-col justify-center items-center p-5">
        <div className="large-card-title">
          <div className="">
            <h5 className="font-semibold text-gray-700 text-2xl">
              {title}
            </h5>
            <p className="text-gray-500">Group: <span className="text-gray-700">Support</span></p>
          </div>
          <Link className="mr-3" to={`/${link}`} className="">
            View all
          </Link>
        </div>
        <div className="w-full mt-1 mb-3 h-full">
          {data.slice(0, 5).map((item, i) => (
            <div className="card-large-item flex flex-row justify-between items-center border-b-2 border-gray-200">
              <p className="">{item.title}</p>
              <Moment className="" format="DD-MM-YYYY">{item.created_at}</Moment>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
