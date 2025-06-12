import express from 'express'
import authenticate from '../middlewares/authentication.middleware.js';
import adminAuth from '../middlewares/adminAuth.middleware.js';
import { addMovie, deleteMovie, fetchMovies, updateMovie } from '../controllers/admin.controller.js';

const adminRouter = express.Router();

adminRouter
.post("/addMovie",authenticate,adminAuth,addMovie)
.patch("/updateMovie/:id",authenticate,adminAuth,updateMovie)
.delete("/deleteMovie/:id",authenticate,adminAuth,deleteMovie)
.get("/fetchMovies",authenticate,adminAuth,fetchMovies)


export default adminRouter