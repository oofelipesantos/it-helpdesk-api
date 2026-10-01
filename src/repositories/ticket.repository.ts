import supabase from "../config/supabase.js";
import type { Ticket } from "../models/ticket.model.js";


export async function createTicket(
    title: string,
    description: string,
    priority: string,
    status: string,
    user_id: string
): Promise<Ticket> {

    const { data, error } = await supabase
        .from("tickets")
        .insert({
            title,
            description,
            priority,
            status,
            user_id
        })
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}


export async function getTickets(): Promise<Ticket[]> {

    const { data, error } = await supabase
        .from("tickets")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data;
}


export async function getTicketById(
    id: string
): Promise<Ticket> {

    const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}


export async function updateTicket(
    id: string,
    title: string,
    description: string,
    priority: string,
    status: string,
    user_id: string
): Promise<Ticket> {

    const { data, error } = await supabase
        .from("tickets")
        .update({
            title,
            description,
            priority,
            status,
            user_id
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}


export async function deleteTicket(
    id: string
): Promise<void> {

    const { error } = await supabase
        .from("tickets")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
}