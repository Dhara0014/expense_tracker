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
import { useState } from "react";

export default function Home() {
  const route = useRouter();

  const totalCredit =
    getLocalStorage("list")
      ?.filter((itm) => itm.type === "INCOME")
      ?.reduce((acc, curr) => acc + curr.price, 0) ?? 0;

  const totalDebit =
    getLocalStorage("list")
      ?.filter((itm) => itm.type === "EXPENCE")
      ?.reduce((acc, curr) => acc + curr.price, 0) ?? 0;

  const [isLoad, setIsLoad] = useState(false);
  const [dataList, setDataList] = useState(getLocalStorage("list"))

  const columns = [
    {
      name: "Category",
      selector: (row) => (
        <div className="flex justify-center items-center gap-3">
          <div className="text-2xl">{iconMaps[row?.selectedCategory?.icon]}</div>
          <span className="font-medium">{row?.selectedCategory?.name}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod,
    },
    {
      name: "Price (₹)",
      selector: (row) => row?.price,
    },
    {
      name: "Actions",
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
          <div className="text-3xl font-bold">₹ {totalCredit}</div>
        </div>

        <div className="p-5 rounded-2xl text-white w-60 bg-gradient-to-r from-blue-500 to-blue-700 shadow-md">
          <div className="flex gap-2 items-center mb-2">
            <BsCreditCardFill className="text-2xl" />
            <span className="text-sm font-medium">Total Debited Money</span>
          </div>
          <div className="text-3xl font-bold">₹ {totalDebit}</div>
        </div>
      </div>

      <div className="rounded-xl shadow-lg bg-white p-5 mb-6 w-full">

        {getLocalStorage("list")?.length > 0 ? (
          <DoughnutChart />
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
