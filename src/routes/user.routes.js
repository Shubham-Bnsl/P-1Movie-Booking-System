import express  from "express";
import { CreateUser, LoginUser, Logout, refreshTokenHandler } from "../controllers/user.controller.js";
import authenticate from "../middlewares/authentication.middleware.js";

const router = express.Router();

router
.post("/signup",CreateUser)
.post("/login",LoginUser)
.get("/logout",authenticate,Logout)
.get("/refreshToken",refreshTokenHandler)



export default router;