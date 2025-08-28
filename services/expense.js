import { supabase } from "@/lib/supabaseClient"


export const getExpenses = async() => {
    const {data, error} = await supabase.from("Expenses").select(`
    *,
    Categories (id, name, icon)
  ` ).order("created_at", {ascending: false});
    if (error) throw error;
    return data;
}

export const addExpense = async(expense) => {
    const {data, error} = await supabase.from("Expenses").insert([expense]).select();
    if(error) throw error;
    return data[0];
}

export const getExpenseData = async(id) => {
    const {data, error} = await supabase.from("Expenses").select(`*, Categories (id, name, icon)
    `).eq("id", id).single();
    if(error) throw error;
    return data;
}

export const updateExpense = async(id, updatedFields) => {
    const {data, error} = await supabase.from("Expenses").update(updatedFields).eq("id", id).select();
    if(error) throw error;
    return data;
}

export const deleteExpense = async(id) => {
    const {data, error} = await supabase.from("Expenses").delete().eq("id", id);
    if(error) throw error;
    return data;
}