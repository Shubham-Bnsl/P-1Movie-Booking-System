import express from "express"
import { bookingTicket } from "../controllers/ticket.controllers.js";
import authenticate from "../middlewares/authentication.middleware.js";


export const ticketRouter = express.Router();


ticketRouter
.post("/bookTicket",authenticate,bookingTicket);
