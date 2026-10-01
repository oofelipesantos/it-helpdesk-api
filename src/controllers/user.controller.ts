import type { Request, Response } from "express";

import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../repositories/user.repository.js";


export async function createUserController(
    req: Request,
    res: Response
) {
    try {

        const { name, email, department } = req.body;

        // Validação dos campos obrigatórios
        if (!name || !email || !department) {
            res.status(400).json({
                error: "Nome, email e departamento são obrigatórios"
            });
            return;
        }

        // Validação básica do email
        if (!email.includes("@")) {
            res.status(400).json({
                error: "Email inválido"
            });
            return;
        }

        const user = await createUser(
            name,
            email,
            department
        );

        res.status(201).json(user);

    } catch (error) {

        res.status(500).json({
            error: "Erro ao criar usuário"
        });

    }
}


export async function getUsersController(
    req: Request,
    res: Response
) {
    try {

        const users = await getUsers();

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            error: "Erro ao buscar usuários"
        });

    }
}


export async function getUserByIdController(
    req: Request,
    res: Response
) {
    try {

        const { id } = req.params;

        if (!id || typeof id !== "string") {
            res.status(400).json({
                error: "ID do usuário inválido"
            });
            return;
        }

        const user = await getUserById(id);

        res.status(200).json(user);

    } catch (error) {

        res.status(404).json({
            error: "Usuário não encontrado"
        });

    }
}


export async function updateUserController(
    req: Request,
    res: Response
) {
    try {

        const { id } = req.params;

        if (!id || typeof id !== "string") {
            res.status(400).json({
                error: "ID do usuário inválido"
            });
            return;
        }

        const { name, email, department } = req.body;

        // Validação dos campos obrigatórios
        if (!name || !email || !department) {
            res.status(400).json({
                error: "Nome, email e departamento são obrigatórios"
            });
            return;
        }

        // Validação básica do email
        if (!email.includes("@")) {
            res.status(400).json({
                error: "Email inválido"
            });
            return;
        }

        const user = await updateUser(
            id,
            name,
            email,
            department
        );

        res.status(200).json(user);

    } catch (error) {

        res.status(404).json({
            error: "Usuário não encontrado"
        });

    }
}


export async function deleteUserController(
    req: Request,
    res: Response
) {
    try {

        const { id } = req.params;

        if (!id || typeof id !== "string") {
            res.status(400).json({
                error: "ID do usuário inválido"
            });
            return;
        }

        await deleteUser(id);

        res.status(200).json({
            message: "Usuário deletado com sucesso"
        });

    } catch (error) {

        res.status(404).json({
            error: "Usuário não encontrado"
        });

    }
}