import express from "express";

import {
    createTicketController,
    getTicketsController,
    getTicketByIdController,
    updateTicketController,
    deleteTicketController
} from "../controllers/ticket.controller.js";


const router = express.Router();


router.post("/", createTicketController);

router.get("/", getTicketsController);

router.get("/:id", getTicketByIdController);

router.put("/:id", updateTicketController);

router.delete("/:id", deleteTicketController);


export default router;