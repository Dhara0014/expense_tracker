"use client";

import { BsCreditCardFill } from "react-icons/bs";
import { BiSolidCreditCardAlt } from "react-icons/bi";
import TableComponent from "./components/TableComponent";
import { GiMilkCarton } from "react-icons/gi";
import DoughnutChart from "./components/Chart";
import MainLayout from "./components/MainLayout";
import { useRouter } from "next/navigation";
import { getLocalStorage, setLocalStorage } from "./components/helper/Local";
import { iconMaps } from "./components/helper/Icons";
import { useEffect, useState } from "react";
import { convertNumber, getDate } from "./components/helper/Counter";

export default function Home() {
  const route = useRouter();

  
  const [isLoad, setIsLoad] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [cardData, setCardData] = useState({ credit: 0, debit: 0 });

useEffect(() => {
  const list = getLocalStorage("list") || [];
  setDataList(list);
  const credit = list.filter(itm => itm.type === "INCOME").reduce((acc, curr) => acc + Number(curr.price), 0);
  const debit = list.filter(itm => itm.type === "EXPENSE").reduce((acc, curr) => acc + Number(curr.price), 0);
  setCardData({ credit, debit });
}, []);

  const columns = [
    {
      name: "Category",
      selector: (row) => (
        <div className="flex justify-center items-center gap-3" title={row?.selectedCategory?.name} >
          <div className="text-2xl">{iconMaps[row?.selectedCategory?.icon]}</div>
          <span className="font-medium">{row?.selectedCategory?.name}</span>
        </div>
      ),
      sortable: true,
      width: "165px",
    },
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod,
      width: "100px"
    },
    {
      name: "Price (₹)",
      selector: (row) => convertNumber(row?.price),
      width: "90px",
    },
    {
      name: "Date",
      selector: (row) => getDate(row?.date),
      width: "150px",
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="bg-gray-400 text-white text-sm px-3 py-1 rounded-lg hover:bg-gray-500 transition"
            onClick={() => route.push(`/edit/${row.id}`)}
          >
            Edit
          </button>

          <button
            className="bg-red-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-700 transition"
            onClick={() => {
              try {
                setIsLoad(true);
                const res = getLocalStorage("list")?.filter(
                  (itm) => itm.id !== row.id
                );
                setDataList(res);
                setLocalStorage("list", res);
                setIsLoad(false);
              } catch (err) {
                setIsLoad(false);
              }
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="flex flex-wrap gap-6 mb-6">
        <div className="p-5 rounded-2xl text-white w-60 bg-gradient-to-r from-green-400 to-green-600 shadow-md">
          <div className="flex gap-2 items-center mb-2">
            <BiSolidCreditCardAlt className="text-2xl" />
            <span className="text-sm font-medium">Total Credited Money</span>
          </div>
          <div className="text-3xl font-bold">₹ {convertNumber(cardData?.credit)}</div>
        </div>

        <div className="p-5 rounded-2xl text-white w-60 bg-gradient-to-r from-blue-500 to-blue-700 shadow-md">
          <div className="flex gap-2 items-center mb-2">
            <BsCreditCardFill className="text-2xl" />
            <span className="text-sm font-medium">Total Debited Money</span>
          </div>
          <div className="text-3xl font-bold">₹ {convertNumber(cardData?.debit)}</div>
        </div>
      </div>

      <div className="rounded-xl shadow-lg bg-white p-5 mb-6 w-full">

        {dataList?.length > 0 ? (
          <DoughnutChart dataList={dataList} />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 border rounded-xl bg-gray-50 text-center">
            <GiMilkCarton className="text-5xl text-gray-400 mb-3" />
            <p className="text-gray-600 text-lg font-medium">No data available</p>
            <p className="text-gray-400 text-sm mb-4">
              Start by adding your first expense
            </p>
            <button
              onClick={() => route.push("/add")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              + Add Expense
            </button>
          </div>
        )}
      </div>

      <div className="rounded-xl shadow-md p-4 bg-white w-full">
        <TableComponent
          columns={columns}
          data={dataList}
          isLoad={isLoad}
          title={
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">Last records overview</div>
              <button
                className="px-3 py-1 bg-blue-700 text-white rounded-lg text-sm hover:bg-blue-800 transition"
                onClick={() => route.push("/add")}
              >
                + Add
              </button>
            </div>
          }
        />
      </div>
    </MainLayout>
  );
}
