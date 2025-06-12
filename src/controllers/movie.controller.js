import errorHandler from "../../utility/errorHandler.js"
import { Movie } from "../modals/movie.modal.js"

export const getMovieByName = async(req,res,next)=>{

        //get name from reqbody
        // find it in documents collection
        // return it 

        const {name} = req.query
        
        if(!name){
                return next(errorHandler(400,"Didn't get name"))
        }
        
        // console.log(name)
        const movie = await Movie.findOne({name:name.toUpperCase()})

        if(!movie){
                return next(errorHandler(400,"Movie not found"))
        }

        return res.status(200).json({
                message: "Movie founded Successfully",
                movie
        })
}


