
"use client";

import React, { useState } from "react";
import { setLocalStorage } from "./helper/Local";

export default function ModalComp({ isModalOpen, setIsModalOpen, categories, setCategories }) {
  const [newCategory, setNewCategory] = useState("");

  if (!isModalOpen) return null;

  const addCategory = () => {
    if (newCategory.trim()) {
        let res = [...categories, {id: Date.now() , name: newCategory, icon: "FaArrowsTurnToDots", isDelete: true }]
      setCategories(res);
      setLocalStorage("category", res)
      setNewCategory("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-80 p-6 relative animate-fadeIn">
        <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">
          Add New Category
        </h2>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category name"
          className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={addCategory}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
