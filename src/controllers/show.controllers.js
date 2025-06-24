import errorHandler from "../../utility/errorHandler.js";
import { Hall } from "../models/hall.model.js";
import { Movie } from "../models/movie.model.js";
import { Show } from "../models/show.model.js";

export const addShow = async (req, res, next) => {

    try {
        const { hall, timing, movie, date } = req.body;


        if (!hall || !timing || !movie || !date) {

            return next(errorHandler(400, "Any Input is missing"))
        }

        const hallInfo = await Hall.findOne({ hallNumber: hall })

        if (!hallInfo) {
            return next(errorHandler(400, "Hall is not created Yet"))
        }

        const hallId = hallInfo._id;

        const movieInfo = await Movie.findOne({ name: movie.toUpperCase() })

        if (!movieInfo) {
            return next(errorHandler(400, "mvoie is not added yet"))
        }

        const movieId = movieInfo._id;

        const oldShow = await Show.findOne({ movie: movieId, timing })

        if (oldShow) {
            return next(errorHandler(400, "Show is Already Exist"))
        }


        const show = await Show.create({

            hall: hallId,
            timing,
            movie: movieId,
            date: new Date(date),

        })


        return res.status(200).json({
            message: "Show is Added successfully",
            show,
            succes: true
        })
    } catch (error) {
        return next(error)
    }

}

export const updateShow = async (req, res, next) => {

    try {
        const { id } = req.params
        const { timing, movie, date } = req.body;

        if (!id) {
            return next(errorHandler(400, "Id is not present"))
        }

        if (!timing || !movie || !date) {
            return next(errorHandler(400, "any input is missing"))
        }

        const show = await Show.findOne({ _id: id })

        if (!show) {
            return next(errorHandler(400, "Show is not present"))
        }


        const movieInfo = await Movie.findOne({ name: movie.toUpperCase() })

        if (!movieInfo) {
            return next(errorHandler(400, "mvoie is not added yet"))
        }

        const movieId = movieInfo._id;


        const newShow = await Show.findByIdAndUpdate(show._id, {
            $set: {
                timing,
                date: new Date(date),
                movie: movieId
            }
        }, { new: true })

        return res.status(200).json({
            message: "Successfully updated show",
            newShow
        })
    } catch (error) {
        return next(error)
    }
}

export const deleteShow = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return next(errorHandler(400, "Id is not present"))
        }

        const show = await Show.findByIdAndDelete({ _id: id })

        if (!show) {
            return next(errorHandler(400, "got some issue while deleting"))

        }

        return res.status(200).json({
            message: "Show is deleted Successfully",
            show,
            success: true,

        })
    } catch (error) {
        return next(error)
    }
}


export const getAllShow = async (req, res, next) => {
    try {

        const { movie, date } = req.body

        if (!movie || !date) {
            return next(errorHandler(400, "any input is missing"))
        }


        const movieInfo = await Movie.findOne({ name: movie.toUpperCase() });

        if (!movieInfo) {
            return next(errorHandler(400, "Movie is not created yet"))
        }

        const show = await Show.find({ movie:movieInfo._id, date })

        if (!show) {

            return next(errorHandler(400, "Didn't get the Shows"))

        }

        return res.status(200).json({
            message: "Shows fetched Successfully",
            show,
            success: true
        })

    } catch (error) {
        return next(error)
    }



}