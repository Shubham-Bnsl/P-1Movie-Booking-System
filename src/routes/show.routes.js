import express from "express";
import { addShow, deleteShow, getAllShow, updateShow } from "../controllers/show.controllers.js";
import authenticate from "../middlewares/authentication.middleware.js";
import adminAuth from "../middlewares/adminAuth.middleware.js";

const showRouter = express.Router();

showRouter
.post('/createShow',authenticate,adminAuth,addShow)
.post('/updateShow/:id',authenticate,adminAuth,updateShow)
.get('/deleteShow/:id',authenticate,adminAuth,deleteShow)
.post('/getAllShow',authenticate,adminAuth,getAllShow)

export default showRouter;