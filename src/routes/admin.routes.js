import express from 'express'
import authenticate from '../middlewares/authentication.middleware.js';
import adminAuth from '../middlewares/adminAuth.middleware.js';
import { addMovie, deleteMovie, fetchMovies, updateMovie } from '../controllers/admin.controllers.js';
import upload from '../middlewares/multer.middleware.js';

const adminRouter = express.Router();

adminRouter
.post("/addMovie",authenticate,adminAuth,upload.fields([{ name: 'posterUrl', maxCount: 1 }]),addMovie)
.patch("/updateMovie/:id",authenticate,adminAuth,upload.fields([{ name: 'posterUrl', maxCount: 1 }]),updateMovie)
.delete("/deleteMovie/:id",authenticate,adminAuth,deleteMovie)
.get("/fetchMovies",authenticate,adminAuth,fetchMovies)


export default adminRouter