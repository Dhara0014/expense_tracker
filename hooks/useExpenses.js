import { useEffect, useState } from "react";
import { getExpenses, addExpense, updateExpense, deleteExpense, getExpenseData } from "@/services/expense";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({});

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error("Error fetching expenses:", err.message);
    }
    setLoading(false);
  };

  const createExpense = async (expense) => {
   setLoading(true);
   try {
    const newExpense = await addExpense(expense);
    setExpenses([newExpense, ...expenses]);
   } catch (error) {
    console.log("Error while creating Expense :", error?.message);
   }
   setLoading(false);
  };

  const gettingEditData = async(id) => {
   setLoading(true);
   try {
    const data = await getExpenseData(id);
    setEditData(data);
   } catch (error) {
    console.log("Error while getting data:", error?.message);
   }
   setLoading(false);
  }

  const editExpense = async (id, fields) => {
      setLoading(true);
      try {
        const updated = await updateExpense(id, fields);
        setExpenses(expenses.map((e) => (e.id === id ? updated : e)));
      } catch (error) {
        console.log("Error while editing Expense:", error?.message);
      }
      setLoading(false);
  };

  const removeExpense = async (id) => {
   setLoading(true);
   try {
    await deleteExpense(id);
    setExpenses(expenses.filter((e) => e.id !== id));
   } catch (error) {
    console.log("Error while deleting Expense :", error?.message);
   }
   setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return { expenses, loading, createExpense, editExpense, removeExpense, gettingEditData , editData};
};
