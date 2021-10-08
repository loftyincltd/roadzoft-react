import React from "react";
import { Link } from "react-router-dom";

export default function LargeCard({title}) {
  const data = [
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
  ];
  
  return (
    <>
      <div className="card-large-wrapper bg-white shadow-sm rounded-sm flex flex-col justify-center items-center">
        <div className="large-card-title">
          <div className="">
            <h5 className="font-semibold text-gray-700 text-2xl">
              {title.name}
            </h5>
            <p className="text-gray-500">Group: <span className="text-gray-700">Support</span></p>
          </div>
          <Link className="mr-3" to="/" className="">
            View all
          </Link>
        </div>
        <div className="w-full mt-1 mb-3 h-full">
          {data.map((item, i) => (
            <div className="card-large-item flex flex-row justify-between items-center border-b-2 border-gray-200">
              <p className="">{item.name}</p>
              <p className="">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
