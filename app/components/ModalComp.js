"use client";
import React, { useState } from 'react';
import { iconMaps } from './helper/Icons';
import { setLocalStorage } from './helper/Local';


const ModalComp = ({isModalOpen, setIsModalOpen, categories, setCategories}) => {

    const [newCategory, setNewCategory] = useState("");


    const handleAddCategory = () => {
        if (newCategory.trim() !== "") {
            let res = [...categories, { id: categories?.length,  name: newCategory, isDelete: true, icon: "FaArrowsTurnToDots" }];
            setLocalStorage("category", res);
            setCategories(res);
            setIsModalOpen(false);
            setNewCategory("");
        }
    };

  return (
    <>
        {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm bg-opacity-40 z-50">
                        <div className="bg-white p-5 rounded-lg w-80 shadow-lg">
                            <h2 className="text-lg font-bold mb-3">Add New Category</h2>
                            <input
                                type="text"
                                placeholder="Enter category name"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="border rounded w-full p-2 mb-4 "
                                autoFocus
                            />
                            <div className="flex justify-end gap-2 mt-3">
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false)
                                        setNewCategory("")
                                    }}
                                    className="px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddCategory}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}
    </>
  )
}

export default ModalComp