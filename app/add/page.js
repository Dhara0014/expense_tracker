"use client";

import React, { useEffect, useState } from 'react'
import MainLayout from '../components/MainLayout';
import { useRouter } from 'next/navigation';
import ModalComp from '../components/ModalComp';
import expenceSchema from '../components/errorHandler/validationSchema';
import { getLocalStorage, setLocalStorage } from '../components/helper/Local';
import { iconMaps } from '../components/helper/Icons';
import { MdKeyboardArrowDown, MdPayment } from 'react-icons/md';
import { FaCreditCard } from 'react-icons/fa6';
import { FaGooglePay } from "react-icons/fa";
import { AiOutlineCloseCircle } from 'react-icons/ai';

const categoryList = [
    { id:0, name: "Groceries", isDelete: false, icon: "FaShoppingBag" },
    { id:1, name: "Milk", isDelete: false, icon: "GiMilkCarton" },
    { id:2, name: "Vegetables/Fruits", isDelete: false, icon: "GiFruitBowl" },
    { id:3, name: "Petrol", isDelete: false, icon: "BsFillFuelPumpFill" },
    { id:4, name: "Shopping", isDelete: false, icon: "RiShoppingCart2Fill" },
    { id:5, name: "Cloths", isDelete: false, icon: "GiClothes" },
]


const page = () => {
    const route = useRouter();
    const [type, setType] = useState("");
    const [categories, setCategories] = useState(() => {
        if(getLocalStorage("category")?.length == 0 ){
            setLocalStorage("category", categoryList);
            return categoryList
        }else{
            return getLocalStorage('category')
        }
    });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [price, setPrice] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [expenceList, setExpenseList] = useState([]);
    
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    
    const [erorrs, setErrors] = useState({});

    // useEffect(() => {
    //     const getData = () => {
    //         setLocalStorage("category",getLocalStorage("category"));
    //     }

    //     window.addEventListener("storage", getData());

    //     return () => {
    //         window.removeEventListener("storage", getData());
    //     }
    // },[])

    const paymentIcons = {
        "Credit Card": <FaCreditCard />,
        "Debit Card": <MdPayment />,
        "UPI": <FaGooglePay />,
      };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = {
            type,
            price: Number(price),
            selectedCategory,
            paymentMethod
        }

        const result = expenceSchema.safeParse(formData);
        if (!result?.success) {
            const formErrors = {};
            result?.error?.issues.forEach(err => {
                formErrors[err?.path[0]] = err?.message
            });
            setErrors(formErrors);
            return
        }
        let res = [...expenceList, { id: Date.now(), ...formData, time: new Date() }];
        setExpenseList(res);
        setLocalStorage("list", [ ...getLocalStorage("list"), ...res]);
        setType("");
        setPrice(0);
        setSelectedCategory(null);
        setPaymentMethod(null)

        route.push("/")
    }

    return (
        <MainLayout>
            <form onSubmit={submitHandler} className='gap-[10 10]' >
                <div className='text-2xl font-bold bg-gray-400 w-full p-3 text-white rounded-2xl ps-4'>
                    Add New Expence
                </div>
                <div className=' flex justify-between gap-10 mt-5'>
                    <button className={`p-3 px-12 border ${type == "INCOME" ? " text-white bg-blue-800" : " text-blue-700"} rounded-2xl text-xl font-bold hover:bg-blue-800 hover:text-white cursor-pointer`} onClick={e => setType(e.target.textContent)} >INCOME</button>
                    <button className={`p-3 px-12 border border-blue-700 ${type == "EXPENCE" ? " text-white bg-blue-800" : " text-blue-700"}  rounded-2xl text-xl font-bold hover:bg-blue-800 hover:text-white cursor-pointer`} onClick={e => setType(e.target.textContent)} >EXPENCE</button>
                </div>
                {
                    erorrs?.type && <p className="text-red-500 text-sm mt-1 mb-2" >{erorrs?.type}</p>
                }
                <div>
                    <label htmlFor="price" className="block text-sm/6 font-semibold text-gray-900">
                        Price
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-xl  bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 p-1 ">
                            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"> ₹ </div>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="0.00"
                                value={price}
                                className="block  min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <div className='text-base text-gray-500 py-1.5 pr-7 pl-3'>
                                INR
                            </div>
                        </div>
                    </div>
                    {erorrs?.price && <p className="text-red-500 text-sm mt-1" >{erorrs?.price}</p>}


                    <div className="sm:col-span-3 mt-4">
                        <label htmlFor="category" className="block text-sm/6 font-semibold text-gray-900">
                            Category
                        </label>
                        <div className="mt-1 grid grid-cols-1  ">

                            <div className="relative">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="w-full outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600  rounded-xl bg-white py-2 px-3 flex justify-between"
                                >
                                    <span className={`${!selectedCategory?.name && "text-gray-400"} `}>{selectedCategory?.name || "Select Category"}</span>
                                    <MdKeyboardArrowDown className='text-gray-500' />
                                </button>

                                {isOpen && (
                                    <div className="absolute w-full bg-white border rounded-xl shadow-lg mt-1 z-10">
                                        {categories?.map((cat) => (
                                            <div
                                                key={cat.name}
                                                className="flex justify-between items-center px-3 py-2 hover:bg-gray-100"
                                            >
                                                <div
                                                    className="flex items-center gap-2 cursor-pointer"
                                                    onClick={() => {
                                                        (isPaymentOpen || isOpen) && setIsOpen(false)
                                                        setSelectedCategory({ name: cat.name, icon: cat.icon });
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    {cat.icon && <span>{iconMaps[cat.icon]}</span>}
                                                    <span>{cat.name}</span>
                                                </div>
                                                {cat?.isDelete && <AiOutlineCloseCircle
                                                    className="text-red-600 cursor-pointer"
                                                    onClick={() =>
                                                        setCategories(categories.filter((c) => c.name !== cat.name))
                                                    }
                                                />}
                                            </div>
                                        ))}
                                        <div
                                            className="px-3 py-2 text-blue-500 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setIsOpen(false);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            Add New Category
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {(erorrs?.selectedCategory || !selectedCategory?.name) && <p className="text-red-500 text-sm mt-1" >{erorrs?.selectedCategory}</p>}

                    <div className="sm:col-span-3 mt-4">
                        <label htmlFor="payment" className="block text-sm/6 font-semibold text-gray-900">
                            Payment Method
                        </label>
                        <div className="mt-1 grid grid-cols-1">
                            <div className="relative">
                                <button
                                    onClick={() => setIsPaymentOpen(!isPaymentOpen)}
                                    className="w-full outline-1 -outline-offset-1 outline-gray-300 rounded-xl bg-white py-2 px-3 flex justify-between"
                                >
                                    <span className={`${!paymentMethod && "text-gray-400"}`}>
                                        {paymentMethod || "Select Payment Method"}
                                    </span>
                                    <MdKeyboardArrowDown className="text-gray-500" />
                                </button>

                                {isPaymentOpen && (
                                    <div className="absolute w-full bg-white border rounded-xl shadow-lg mt-1 z-10">
                                        {["Credit Card", "Debit Card",].map((method) => (
                                            <div
                                                key={method}
                                                className="flex gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => {
                                                    (isOpen || isPaymentOpen) && setIsOpen(false)
                                                    setPaymentMethod(method);
                                                    setIsPaymentOpen(false);
                                                }}
                                            >
                                                <span className='text-lg'>{paymentIcons[method]}</span>
                                                <span>{method}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {(erorrs?.paymentMethod) && <p className="text-red-500 text-sm mt-1" >{erorrs?.paymentMethod}</p>}

                    <div className="flex justify-end gap-18 mt-8">
                        <button
                            onClick={() => route.push("/")}
                            className="px-15 py-2 bg-gray-500 text-white text-lg font-semibold rounded-xl cursor-pointer hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className="px-15 py-2 bg-green-600 text-white text-lg font-semibold rounded-xl cursor-pointer hover:bg-green-600"
                        >
                            Add
                        </button>
                    </div>

                    {/* Modal */}
                    <ModalComp isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} categories={categories} setCategories={setCategories} />


                </div>
            </form>

        </MainLayout>
    )
}

export default page