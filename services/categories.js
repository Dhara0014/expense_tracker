import { supabase } from "@/lib/supabaseClient";

export const getCategories = async () => {
  const { data, error } = await supabase.from("Categories").select("*");
  if (error) throw error;
  return data;
};

export const addCategory = async (category) => {
  const { data, error } = await supabase.from("Categories").insert([category]).select();
  if (error) throw error;
  return data[0];
};

export const updateCategory = async (id, updatedFields) => {
  const { data, error } = await supabase.from("Categories").update(updatedFields).eq("id", id).select();
  if (error) throw error;
  return data[0];
};

export const deleteCategory = async (id) => {
  const { error } = await supabase.from("Categories").delete().eq("id", id);
  if (error) throw error;
};
