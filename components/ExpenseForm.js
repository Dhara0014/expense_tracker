"use client";

import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { iconMaps } from "./helper/Icons";
import ModalComp from "./ModalComp";
import expenceSchema from "../lib/errorHandler/validationSchema";
import { useRouter } from "next/navigation";
import { convertNumber } from "./helper/Counter";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useCategories } from "@/hooks/useCategories";
import { useExpenses } from "@/hooks/useExpenses";

export default function ExpenseForm({ initialData, mode = "add" }) {
  const router = useRouter();
  const {categories, removeCategory, createCategory, fetchCategories} = useCategories();
  const {createExpense, editExpense} = useExpenses(); 

  const [type, setType] = useState(initialData?.type || "EXPENSE");
  const [selectedCategory, setSelectedCategory] = useState(
    initialData?.Categories || null
  );
  const [price, setPrice] = useState(initialData?.price || "" );
  const [paymentMethod, setPaymentMethod] = useState(
    initialData?.payment_method || "Debit Card"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(initialData?.date || new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const submitHandler = async(e) => {
    e.preventDefault();

    const formData = {
      type,
      price: Number(price),
      category_id: selectedCategory?.id,
      payment_method: paymentMethod,
      date
    };
    console.log("formData >>", formData);

    const result = expenceSchema.safeParse(formData);
    if (!result?.success) {
      const formErrors = {};
      result?.error?.issues.forEach((err) => {
        formErrors[err?.path[0]] = err?.message;
      });
      setErrors(formErrors);
      return;
    }

    if (mode === "add") {
      await createExpense(formData)

    } else {
      await editExpense(initialData?.id, formData)
    }
    router.push("/");
  };

  const deleteCategoryHandler = async(cat) =>  {
    await removeCategory(cat?.id);
   }

  return (
   <form
    onSubmit={submitHandler}
    className="w-full mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-20 border border-gray-200"
  >
    <div className="flex gap-4 mb-6">
      {["INCOME", "EXPENSE"].map((t) => (
        <button
          type="button"
          key={t}
          onClick={() => setType(t)}
          className={`flex-1 py-3 text-lg font-bold rounded-xl transition-all duration-200 ${
            type === t
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md scale-105"
              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
    {errors?.type && <p className="text-red-500 text-sm">{errors.type}</p>}

    <label className="block text-sm font-medium text-gray-700 mb-1">
      Price
    </label>
    <div className="flex items-center rounded-xl border p-2 mb-3 bg-white">
      <span className="text-gray-500 mr-2">₹</span>
      <input
        type="text"
        value={convertNumber(price) || ""}
        onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(rawValue)) {
                setPrice(rawValue);
              }
          }}
        placeholder="0.00"
        className="flex-1 outline-none text-gray-900"
      />
      <span className="text-gray-500 ml-4">INR</span>
    </div>
    {errors?.price && <p className="text-red-500 text-sm">{errors.price}</p>}

    {/* DATE PICKER */}
    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
      <div className="flex items-center rounded-xl border p-2 mb-3 bg-white">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 outline-none text-gray-900 bg-transparent"
        />
      </div>

    <label className="block text-sm font-medium text-gray-700 mb-1">
      Category
    </label>
    <div className="relative mb-3">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border rounded-xl py-2 px-3 flex justify-between bg-white"
      >
        <span
          className={`${
            !selectedCategory?.name && "text-gray-400"
          } text-left`}
        >
          {selectedCategory?.name || "Select Category"}
        </span>
        <MdKeyboardArrowDown className="text-gray-500" />
      </button>
      {isOpen && (
        <div className="absolute w-full bg-white border rounded-xl shadow-lg mt-1 z-20 max-h-65 overflow-y-auto">
          {categories?.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer"
              
            >
            <div className="flex w-full"
              onClick={() => {
                setSelectedCategory(cat);
                setIsOpen(false);
              }}
            >
              <span className="flex justify-center items-center">
              {cat.icon && <span className="mr-2">{iconMaps[cat.icon]}</span>}
              {cat.name}
              </span>
            </div>
             {cat?.isDelete && <span className="" onClick={() => deleteCategoryHandler(cat)}>
              <IoCloseCircleOutline className="text-red-600 text-lg" />
              </span>}
            </div>
          ))}
          <div
            className="px-3 py-2 text-blue-500 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setIsOpen(false);
              setIsModalOpen(true);
            }}
          >
            + Add New Category
          </div>
        </div>
      )}
    </div>
    {errors?.category_id && (
      <p className="text-red-500 text-sm">{errors.category_id}</p>
    )}

    <label className="block text-sm font-medium text-gray-700 mb-1">
      Payment Method
    </label>
    <div className="flex items-center rounded-xl border p-2 mb-4 bg-white">
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="flex-1 outline-none bg-transparent"
      >
        <option value="Credit Card">Credit Card</option>
        <option value="Debit Card">Debit Card</option>
      </select>
    </div>

    <div className="flex justify-end gap-3 mt-6">
      <button
        type="button"
        onClick={() => router.push("/")}
        className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-600 rounded-lg transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-md transition"
      >
        {mode === "add" ? "Add Expense" : "Update Expense"}
      </button>
    </div>

    <ModalComp
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      createCategory={createCategory}
      fetchCategories={fetchCategories}
    />
  </form>
  );
}
