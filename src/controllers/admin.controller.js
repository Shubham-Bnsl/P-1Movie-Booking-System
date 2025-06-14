import errorHandler from "../../utility/errorHandler.js";
import { Movie } from "../modals/movie.modal.js"

export const addMovie = async (req, res, next) => {

    // get all details from req.body
    // find movie in schema if its not then forward
    // create new movie and save
    try {
        const { name, agelimit, description, genre, posterUrl, releaseDate, language, cast, duration } = req.body
    
        const movie = await Movie.findOne({ name });
    
        if (movie) {
            return next(errorHandler(400, "Movie is already added"))
        }


    
        const newMovie = await Movie.create({
            name,
            agelimit,
            description,
            genre,
            posterUrl,
            releaseDate: new Date(releaseDate),
            language,
            cast,
            duration
        })
    
    
        return res.status(200).json({
            message:"Movie is added successfully",
            newMovie
        })

    } catch (error) {
        return next(error)
    }


}

export const updateMovie = async(req,res,next)=>{

//get details and id what u want to update from req.body
// find movie exist or not 
// update the movie details

    try {
        const {id} = req.params;
        const {posterUrl,cast} = req.body
        
        if(!id){
            return next(errorHandler(400,"Movie is not present"))
        }

        if(!posterUrl){
            return next(errorHandler(400,"posterUrl is not present"))
        }
    
        const movie = await Movie.findByIdAndUpdate(id,{
    
            $set:{
                posterUrl,
                cast
            }
        },{new:true})


        if(!movie){
            return next(errorHandler(400,"movie not find"))
        }
    
        return res.status(200).json({
            message:"movie details are updated",
            movie
        })
    } catch (error) {
        return next(error)
    }
}

export const deleteMovie = async(req,res,next)=>{

    //get id from params
    //search in the movies 
    //

try {
    
        const {id} = req.params
    
        if(!id){
            return next(errorHandler(400,"Id Didn't recieved"))
        }

        const movie = await Movie.findByIdAndDelete(id);

        if(!movie){
            return next(errorHandler(400,"Movie is not present in database"))
        }

        return res.status(200).json({
            message:"Movie is Deleted Successfully",
            movie
        })
    
}

catch (error) {
    return next(error)
}


 }

export const fetchMovies = async(req,res,next)=>{

    const movie = await Movie.find();

    if(!movie){
        return next(errorHandler(400,"No movies has been created yet"))
    }

    return res.status(200).json({
        message:"All movies fetched Successfully",
        movie
    })

}




