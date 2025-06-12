import express from 'express'
import authenticate from '../middlewares/authentication.middleware.js'
import { getMovieByName } from '../controllers/movie.controller.js'

const movieRouter = express.Router()


movieRouter
.get("/searchMovie",authenticate,getMovieByName)

export default movieRouter

