import errorHandler from "../../utility/errorHandler.js"
import { Hall } from "../modals/hall.modal.js"

export const createHall = async (req, res, next) => {
    try {

        const { hallNumber, totalSeats } = req.body

        if (!hallNumber || !totalSeats) {
            return next(errorHandler(400, "Hallnumber and totalseats are required"))
        }

        const hall = await Hall.findOne({ hallNumber });

        if (hall) {
            return next(errorHandler(400, "This Hall is already Created. Plz try another!"));
        }

        const newHall = await Hall.create({
            hallNumber,
            totalSeats

        })

        return res.status(200).json({
            message: "Hall Successfully created",
            newHall,
            success: true
        })
    } catch (error) {
        return next(error)
    }

}

export const getAllHalls = async(req,res,next)=>{
        
    try {
        const halls = await Hall.find();
    
        if(!halls){
            return next(errorHandler(400,"Didn't get the halls"))
        }
    
        return res.status(200).json({
            message:true,
            halls,
            success:true
        })
    } catch (error) {
        return next(error)
    }
}