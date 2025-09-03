"use client";

import { BsCreditCardFill } from "react-icons/bs";
import { BiSolidCreditCardAlt } from "react-icons/bi";
import TableComponent from "../components/TableComponent";
import DoughnutChart from "../components/Chart";
import MainLayout from "../components/MainLayout";
import { useRouter } from "next/navigation";
import { iconMaps } from "../components/helper/Icons";
import { convertNumber, getDate } from "../components/helper/Counter";
import { useExpenses } from "@/hooks/useExpenses";
import Loader from "@/components/Loader";
import { useMemo, useState } from "react";

export default function Home() {
  const route = useRouter();

  const {expenses, loading, removeExpense} = useExpenses();
  const [selectedMonth, setSelectedMonth] = useState("");

    const months = useMemo(() => {
      const unique = new Set();
      (expenses ?? []).forEach((exp) => {
        if (!exp.date) return;
        const date = new Date(exp.date);
        if (!isNaN(date)) {
          const monthYear = date.toLocaleString("default", {
            month: "long",
            year: "numeric",
          });
          unique.add(monthYear);
        }
      });
      return Array.from(unique);
    }, [expenses]);
  
    useMemo(() => {
      if (months.length > 0 && !selectedMonth) {
        setSelectedMonth(months[0]);
      }
    }, [months, selectedMonth]);

  const filteredExpenses = useMemo(() => {
    if (!selectedMonth) return [];
    return expenses.filter((exp) => {
      const date = new Date(exp.date);
      const monthYear = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      return monthYear === selectedMonth;
    });
  }, [expenses, selectedMonth]);

  const totalIncome = filteredExpenses
    .filter((itm) => itm.type === "INCOME")
    .reduce((acc, curr) => acc + Number(curr.price), 0);

  const totalExpense = filteredExpenses
    .filter((itm) => itm.type === "EXPENSE")
    .reduce((acc, curr) => acc + Number(curr.price), 0);

  const columns = [
    {
      name: "Category",
      selector: (row) => (
        <div className="flex justify-center items-center gap-3" title={row?.Categories?.name} >
          <div className="text-2xl">{iconMaps[row?.Categories?.icon]}</div>
          <span className="font-medium">{row?.Categories?.name}</span>
        </div>
      ),
      sortable: true,
      width: "165px",
    },
    {
      name: "Payment Method",
      selector: (row) => row.type,
      width: "100px"
    },
    {
      name: "Price (₹)",
      selector: (row) => convertNumber(row?.price),
      width: "90px",
    },
    {
      name: "Date",
      selector: (row) => getDate(row?.date) ,
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
            onClick={() => removeExpense(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
     <> 
      {
        loading ? <Loader /> : 
        <MainLayout>
      <div className="flex w-full justify-between items-center gap-10">
        <div className="p-5 rounded-2xl text-white w-full bg-gradient-to-r from-green-400 to-green-600 shadow-md">
          <div className="flex gap-2 items-center mb-2">
            <BiSolidCreditCardAlt className="text-2xl" />
            <span className="text-sm font-medium">Total Credited Money</span>
          </div>
          <div className="text-3xl font-bold">₹ {convertNumber(totalIncome)}
          </div>
        </div>

        <div className="p-5 rounded-2xl text-white w-full bg-gradient-to-r from-blue-500 to-blue-700 shadow-md">
          <div className="flex gap-2 items-center mb-2">
            <BsCreditCardFill className="text-2xl" />
            <span className="text-sm font-medium">Total Debited Money</span>
          </div>
          <div className="text-3xl font-bold">₹ {convertNumber(totalExpense)}
          </div>
        </div>
      </div>

      <div className="rounded-xl shadow-lg bg-white p-5 mb-6 w-full">

        {expenses?.length > 0 ? (
          <DoughnutChart 
                expenses={filteredExpenses}
                months={months}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 border rounded-xl bg-gray-50 text-center">
            <img
                src="/favicon.svg"
                alt="App Logo"
                className="w-15 h-16 mb-3  bg-gray-400 p-2 rounded-full"
  />
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

     {filteredExpenses?.length > 0 && <div className="rounded-xl shadow-md p-4 bg-white w-full">
        <TableComponent
          columns={columns}
          data={filteredExpenses}
          isLoad={loading}
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
      </div>}
    </MainLayout>
      }
     </>
  );
}
