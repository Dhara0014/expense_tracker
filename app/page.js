"use client";

import Image from "next/image";
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

export default function Home() {

  const [cardData, setCardData] = useState({
    credit: JSON.parse(getLocalStorage("list")?.filter(itm => itm.type == "INCOME")?.reduce((acc, curr) => acc + curr.price, 0) ?? 0),
    debit: JSON.parse(getLocalStorage("list")?.filter(itm => itm.type == "EXPENCE")?.reduce((acc, curr) => acc + curr.price, 0) ?? 0)
  });

  const [isLoad, setIsLoad] = useState(false);
  const [dataList, setDataList] = useState(getLocalStorage("list") || []);
  const route = useRouter();

  const columns = [
    {
      name: "Category",
      selector: (row) => {
        return <div className="flex justify-center items-center gap-3">
          <div className="text-2xl "> {iconMaps[row?.selectedCategory.icon]} </div>
          <span>{row?.selectedCategory.name}</span>
        </div>
      },
      sortable: true,

    },
    {
      name: "Payment Method",
      selector: (row) => row.paymentMethod,
    },
    {
      name: "Price (₹)",
      selector: (row) => row?.price
    },
    {
      name: "",
      cell : (row) => {
       return  <div className=" flex gap-2">
          <button className="bg-gray-400 text-white text-sm p-2 cursor-pointer rounded-xl font-semibold" onClick={() => route.push(`/edit/${row.id}`)} >Edit</button>

          <button className="bg-red-600 text-white p-2 text-sm cursor-pointer rounded-xl font-semibold" onClick={() => deleteHandler(row.id) }>Delete</button>
        </div>
      }
    }
  ];

  const deleteHandler = (id) => {
    setIsLoad(true);
    let res = getLocalStorage("list")?.filter(itm => itm.id != id);
    setLocalStorage("list", res);
    setDataList(res);
    setIsLoad(false);
  }

  return (
    <MainLayout>
      <div className="flex gap-10">
        <div className="p-5 bg-blue-300 rounded-2xl text-white w-60">
          <div className=" flex gap-1">
            <BiSolidCreditCardAlt className="text-xl" />
            <span>Total Credited Money</span>

          </div>
          <div className="text-4xl"> {cardData?.credit} </div>
        </div>
        <div className="p-5 bg-blue-800 text-white rounded-2xl w-60">
          <div className="flex gap-1">
            <BsCreditCardFill className="text-xl" />
            Total Debited Money
          </div>
          <div className="text-4xl"> {cardData?.debit} </div>
        </div>
      </div>

      <div className="rounded-xl shadow-lg w-full">

      {getLocalStorage("list")?.length > 0 ? (
  <DoughnutChart />
) : (
  <div className="flex flex-col items-center justify-center p-6 border rounded-xl bg-gray-50 text-center">
    <GiMilkCarton className="text-5xl text-gray-400 mb-3" />
    <p className="text-gray-600 text-lg font-medium">No data available</p>
    <p className="text-gray-400 text-sm mb-4">Start by adding your first expense</p>
    <button
      onClick={() => route.push("/add")}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      + Add Expense
    </button>
  </div>
)}


      </div>



      <div className="rounded-xl shadow-md p-2 w-full">
        <TableComponent 
            columns={columns} 
            data={dataList}
            isLoad={isLoad}
            title={
                  <div className=" flex  justify-between">
                    <div>
                      Last records overview
                    </div>
                    <div className=" p-2 bg-blue-700 text-white rounded-xl text-[18px]">
                      <button className="cursor-pointer" onClick={() => route.push('/add')} > + Add</button>
                    </div>
                  </div>} />
      </div>

    </MainLayout>
  );
}
