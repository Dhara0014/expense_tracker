// "use client"; 

// import React from "react";
// import DataTable from "react-data-table-component";

// const customStyles = {
//   rows: {
//     style: {
//       minHeight: "48px", // row height
//     },
//   },
//   headCells: {
//     style: {
//       paddingLeft: "8px",
//       paddingRight: "8px",
//       // backgroundColor: "#f3f4f6",
//       fontWeight: "bold",
//     },
//   },
//   cells: {
//     style: {
//       paddingLeft: "8px",
//       paddingRight: "8px",
//       fontSize: "17px",
//     },
//   },
// };

// const TableComponent = ({ columns, data, title, isLoad }) => {
//   return (
//     <DataTable
//       title={title}
//       columns={columns}
//       data={data}
//       customStyles={customStyles}
//       pagination
//       highlightOnHover
//       progressPending={!data || isLoad}
//       // striped
//       // dense
//     />
//   );
// };

// export default TableComponent;


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
