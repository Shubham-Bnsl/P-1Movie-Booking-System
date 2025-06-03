import express  from "express";
import { CreateUser, LoginUser, Logout } from "../controllers/user.controller.js";
import authenticate from "../middlewares/authentication.middleware.js";

const router = express.Router();

router
.post("/signup",CreateUser)
.post("/login",LoginUser)
.get("/logout",authenticate,Logout)
// .get("/logout",authenticate,Logout)



export default router;