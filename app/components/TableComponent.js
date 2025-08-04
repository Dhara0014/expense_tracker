"use client"; 

import React from "react";
import DataTable from "react-data-table-component";

const customStyles = {
  rows: {
    style: {
      minHeight: "48px", // row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      // backgroundColor: "#f3f4f6",
      fontWeight: "bold",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      fontSize: "17px",
    },
  },
};

const TableComponent = ({ columns, data, title, isLoad }) => {
  return (
    <DataTable
      title={title}
      columns={columns}
      data={data}
      customStyles={customStyles}
      pagination
      highlightOnHover
      progressPending={!data || isLoad}
      // striped
      // dense
    />
  );
};

export default TableComponent;
