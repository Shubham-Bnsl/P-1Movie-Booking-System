import express, { Router } from "express";
import authenticate from "../middlewares/authentication.middleware.js";
import adminAuth from "../middlewares/adminAuth.middleware.js";
import { createSeat, getAllSeats } from "../controllers/seat.controllers.js";

const seatRouter = express.Router();

seatRouter
.post("/createSeat",authenticate,adminAuth,createSeat)
.get("/getAllSeats",authenticate,adminAuth,getAllSeats)

export default seatRouter;