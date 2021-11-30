import React from "react";
import DataTable from "react-data-table-component";

export default function ProjectTable({ data, columns, changePage, countPerPage, total }) {
  return (
    <div className="shadow mx-5 my-3">
      <DataTable
        columns={columns}
        data={data}
        pagination={false}
        highlightOnHover
        paginationTotalRows={total}
       /*  paginationServer
        paginationTotalRows={total}
        paginationPerPage={countPerPage}
        paginationComponentOptions={{
          noRowsPerPage: true,
        }}
        onChangePage={changePage} */
      />
    </div>
  );
}
