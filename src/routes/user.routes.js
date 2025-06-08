import express  from "express";
import { CreateUser, LoginUser, Logout, refreshTokenHandler, updateProfile } from "../controllers/user.controller.js";
import authenticate from "../middlewares/authentication.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

userRouter
.post("/signup",upload.fields([{ name: 'avatar', maxCount: 1 }]),CreateUser)
.post("/login",LoginUser)
.get("/logout",authenticate,Logout)
.get("/refreshToken",refreshTokenHandler)
.patch("/updateProfile",authenticate,upload.fields([{ name: 'avatar', maxCount: 1 }]),updateProfile)



export default userRouter;