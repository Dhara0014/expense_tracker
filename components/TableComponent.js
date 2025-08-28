
"use client";

import DataTable from "react-data-table-component";

const customStyles = {
  rows: {
    style: {
      minHeight: "48px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "12px",
      paddingRight: "12px",
      backgroundColor: "#f3f4f6",
      fontWeight: "bold",
      fontSize: "14px",
      color: "#374151",
    },
  },
  cells: {
    style: {
      paddingLeft: "12px",
      paddingRight: "12px",
      fontSize: "15px",
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
    />
  );
};

export default TableComponent;
