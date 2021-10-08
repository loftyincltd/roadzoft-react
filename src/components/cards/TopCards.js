import React from "react";
import { Link } from "react-router-dom";

export default function TopCards({ info }) {
  return (
    <>
      <div className="card-wrapper bg-white shadow-sm rounded-sm flex flex-col justify-center items-center">
        <h5 className="font-semibold text-gray-500">{info.title}</h5>
        <h2 className="text-gray-600 text-3xl font-bold">{info.data}</h2>
      </div>
    </>
  );
}
