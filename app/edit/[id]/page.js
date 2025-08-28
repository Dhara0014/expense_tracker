
"use client";

import MainLayout from "../../../components/MainLayout";
import ExpenseForm from "../../../components/ExpenseForm";
import { use, useEffect } from "react";
import { useExpenses } from "@/hooks/useExpenses";
import Loader from "@/components/Loader";

export default function EditPage ({ params }) {
  const { id } = use(params);
  const {gettingEditData, editData, loading} = useExpenses();

  useEffect(() => {
    const getData = async() => {
      await gettingEditData(id);
    }
    getData();
  },[id]);

  return (
    <>
      {
        loading ? <Loader /> :
        <MainLayout>
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-xl mb-6 text-center font-bold text-xl w-full">
        Edit Expense
      </div>
      <ExpenseForm mode="edit" initialData={editData} />
    </MainLayout>
      }
    </>
  );
}
