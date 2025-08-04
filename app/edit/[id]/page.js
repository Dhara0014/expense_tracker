
"use client";

import MainLayout from "../../components/MainLayout";
import ExpenseForm from "../../components/ExpenseForm";
import { getLocalStorage } from "../../components/helper/Local";

export default function EditPage({ params }) {
  const { id } = params;
  const data = getLocalStorage("list")?.find((item) => item.id == id);

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-xl mb-6 text-center font-bold text-xl w-full">
        Edit Expense
      </div>
      <ExpenseForm mode="edit" initialData={data} />
    </MainLayout>
  );
}
