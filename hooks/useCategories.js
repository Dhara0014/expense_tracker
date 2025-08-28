import { useEffect, useState } from "react";
import { getCategories, addCategory, deleteCategory } from "@/services/categories";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err.message);
    }
    setLoading(false);
  };

  const createCategory = async (category) => {
    try {
        setLoading(true);
        const newCat = await addCategory(category);
        setCategories([...categories, newCat]);
      } catch (error) {
        console.error("Error adding categories:", error.message);
      }
        setLoading(false);
  };

  const removeCategory = async (id) => {
    setLoading(true);
    try {
      await deleteCategory(id);
      setCategories(categories.filter((c) => c.id !== id));
    } catch (error) {
      console.log("Error while deleting Category:", error?.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, createCategory, removeCategory, fetchCategories};
};
