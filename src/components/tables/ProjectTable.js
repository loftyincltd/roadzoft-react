import React from "react";
import DataTable from "react-data-table-component";

const customStyles = {
  headCells: {
    style: {
        backgroundColor: "#043C2D",
        color: 'white',
    },
   
},
 
};

export default function ProjectTable({ data, columns, changePage, countPerPage, total }) {
  return (
    <div className="shadow mx-5 my-3">
      <DataTable
        columns={columns}
        data={data}
        pagination={false}
        highlightOnHover
        paginationTotalRows={total}
        customStyles={customStyles}
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
