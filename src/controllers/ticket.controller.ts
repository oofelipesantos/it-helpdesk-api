import type { Request, Response } from "express";

import {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket
} from "../repositories/ticket.repository.js";

import {
    getUserById
} from "../repositories/user.repository.js";


const validPriorities = ["low", "medium", "high"];

const validStatuses = ["open", "in_progress", "closed"];


export async function createTicketController(
    req: Request,
    res: Response
) {
    try {

        const {
            title,
            description,
            priority,
            status,
            user_id
        } = req.body;


        if (
            !title ||
            !description ||
            !priority ||
            !status ||
            !user_id
        ) {
            res.status(400).json({
                error: "Título, descrição, prioridade, status e usuário são obrigatórios"
            });
            return;
        }


        if (!validPriorities.includes(priority)) {
            res.status(400).json({
                error: "Prioridade inválida. Use: low, medium ou high"
            });
            return;
        }


        if (!validStatuses.includes(status)) {
            res.status(400).json({
                error: "Status inválido. Use: open, in_progress ou closed"
            });
            return;
        }


        // Verifica se o usuário existe
        try {

            await getUserById(user_id);

        } catch (error) {

            res.status(400).json({
                error: "Usuário informado não existe"
            });

            return;
        }


        const ticket = await createTicket(
            title,
            description,
            priority,
            status,
            user_id
        );


        res.status(201).json(ticket);

    } catch (error) {

        res.status(500).json({
            error: "Erro ao criar chamado"
        });

    }
}


export async function getTicketsController(
    req: Request,
    res: Response
) {
    try {

        const tickets = await getTickets();

        res.status(200).json(tickets);

    } catch (error) {

        res.status(500).json({
            error: "Erro ao buscar chamados"
        });

    }
}


export async function getTicketByIdController(
    req: Request,
    res: Response
) {
    try {

        const { id } = req.params;

        if (!id || typeof id !== "string") {
            res.status(400).json({
                error: "ID do chamado inválido"
            });
            return;
        }

        const ticket = await getTicketById(id);

        res.status(200).json(ticket);

    } catch (error) {

        res.status(404).json({
            error: "Chamado não encontrado"
        });

    }
}


export async function updateTicketController(
    req: Request,
    res: Response
) {
    try {

        const { id } = req.params;

        if (!id || typeof id !== "string") {
            res.status(400).json({
                error: "ID do chamado inválido"
            });
            return;
        }

        const {
            title,
            description,
            priority,
            status,
            user_id
        } = req.body;


        if (
            !title ||
            !description ||
            !priority ||
            !status ||
            !user_id
        ) {
            res.status(400).json({
                error: "Título, descrição, prioridade, status e usuário são obrigatórios"
            });
            return;
        }


        if (!validPriorities.includes(priority)) {
            res.status(400).json({
                error: "Prioridade inválida. Use: low, medium ou high"
            });
            return;
        }


        if (!validStatuses.includes(status)) {
            res.status(400).json({
                error: "Status inválido. Use: open, in_progress ou closed"
            });
            return;
        }


        // Verifica se o usuário existe
        try {

            await getUserById(user_id);

        } catch (error) {

            res.status(400).json({
                error: "Usuário informado não existe"
            });

            return;
        }


        const ticket = await updateTicket(
            id,
            title,
            description,
            priority,
            status,
            user_id
        );


        res.status(200).json(ticket);

    } catch (error) {

        res.status(404).json({
            error: "Chamado não encontrado"
        });

    }
}


export async function deleteTicketController(
    req: Request,
    res: Response
) {
    try {

        const { id } = req.params;

        if (!id || typeof id !== "string") {
            res.status(400).json({
                error: "ID do chamado inválido"
            });
            return;
        }


        await deleteTicket(id);


        res.status(200).json({
            message: "Chamado deletado com sucesso"
        });

    } catch (error) {

        res.status(404).json({
            error: "Chamado não encontrado"
        });

    }
}