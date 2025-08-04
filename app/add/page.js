
"use client";
import MainLayout from "../components/MainLayout";
import ExpenseForm from "../components/ExpenseForm";

export default function AddPage() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl mb-6 text-center font-bold text-xl w-full">
        Add New Expense
      </div>
      <ExpenseForm mode="add" />
    </MainLayout>
  );
}
