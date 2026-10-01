import supabase from "../config/supabase.js";
import type { User } from "../models/user.model.js";

export async function createUser(
    name: string,
    email: string,
    department: string
): Promise<User> {

    const { data, error } = await supabase
        .from("users")
        .insert({
            name,
            email,
            department
        })
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getUsers(): Promise<User[]> {
    const { data, error } = await supabase
        .from("users")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getUserById(id: string): Promise<User> {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function updateUser(
    id: string,
    name: string,
    email: string,
    department: string
): Promise<User> {

    const { data, error } = await supabase
        .from("users")
        .update({
            name,
            email,
            department
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function deleteUser(id: string): Promise<void> {
    const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
}