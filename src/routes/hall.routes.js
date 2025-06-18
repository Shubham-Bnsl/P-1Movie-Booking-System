import express, { Router } from "express";
import authenticate from "../middlewares/authentication.middleware.js";
import adminAuth from "../middlewares/adminAuth.middleware.js";
import { createHall, getAllHalls } from "../controllers/hall.controllers.js";

const hallRouter = express.Router();

hallRouter
.post("/createHall",authenticate,adminAuth,createHall)
.get("/getHalls",authenticate,adminAuth,getAllHalls)

export default hallRouter