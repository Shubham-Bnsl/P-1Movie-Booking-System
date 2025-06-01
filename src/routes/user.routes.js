import express  from "express";
import { CreateUser } from "../controllers/user.controller.js";

const router = express.Router();

router
.post("/signup",CreateUser)


export default router;