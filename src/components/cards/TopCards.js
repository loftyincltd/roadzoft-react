import React from "react";
import { Link } from "react-router-dom";

export default function TopCards({ info }) {
  return (
    <>
      <div style={{background: info.color}} className="card-wrapper text-white shadow-sm rounded-sm flex flex-col justify-center items-center">
        <h5 className="font-semibold text-white">{info.title}</h5>
        <h2 className="text-white text-3xl font-bold">{info.data}</h2>
      </div>
    </>
  );
}
