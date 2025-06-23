import express from "express";
import { addShow, deleteShow, updateShow } from "../controllers/show.controllers.js";
import authenticate from "../middlewares/authentication.middleware.js";
import adminAuth from "../middlewares/adminAuth.middleware.js";

const showRouter = express.Router();

showRouter
.post('/createShow',authenticate,adminAuth,addShow)
.post('/updateShow/:id',authenticate,adminAuth,updateShow)
.get('/deleteShow/:id',authenticate,adminAuth,deleteShow)

export default showRouter;