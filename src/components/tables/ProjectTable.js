import React from "react";
import DataTable from 'react-data-table-component';

export default function ProjectTable({data, columns}) {
  
  return (
    <div className="shadow mx-5 my-3">
      <DataTable
            columns={columns}
            data={data}
            pagination
        />
    </div>
  );
}
