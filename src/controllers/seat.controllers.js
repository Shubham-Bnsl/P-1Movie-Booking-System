import errorHandler from "../../utility/errorHandler.js";
import { Hall } from "../modals/hall.modal.js";
import { Seat } from "../modals/seat.modal.js";

export const createSeat = async (req, res, next) => {

    //    try {
    //      const {type,number,price,hall} = req.body;

    //      if(!type || !number || !price || !hall){
    //          return next(errorHandler(400,"any input parameter is missing"))
    //      }

    //      const hallInfo = await Hall.findOne({hallNumber:hall})

    //      if(!hallInfo){
    //          return next(errorHandler(400,"Given hall is not created"))
    //      }

    //      const seat = await Seat.create({
    //          type,
    //          number,
    //          price,
    //          hall:hallInfo._id
    //      })


    //      return res
    //      .status(200)
    //      .json({
    //          message:"Your Seat is created",
    //          seat,
    //          success:true
    //      })
    //    } catch (error) {
    //         return next(error)
    //    }

    try {


        const { seats, hallNumber } = req.body;

        if (!seats || !hallNumber || seats.length == 0 || !Array.isArray(seats)) {
            return next(errorHandler(400, "any input parameter is missing"))
        }

        const hallInfo = await Hall.findOne({ hallNumber })

        if (!hallInfo) {
            return next(errorHandler(400, "Hall is not Created yet"))
        }

        const seatsToInsert = seats.map(seat => ({
            ...seat,
            hall: hallInfo._id
        }));

        const seat = await Seat.insertMany(seatsToInsert,{ordered:true},{validateBeforeSave: true});

        return res.status(200).json({
            message: "Seats are created",
            seat,
            success: true
        })

    } catch (error) {
        return next(error);
    }



}


export const getAllSeats = async (req, res, next) => {

    try {
        const seats = await Seat.find();
    
        if (!seats) {
            return next(errorHandler(400, "Seats are not created yet"))
        }
    
        const Classic = seats.filter(seat =>
            seat.type == "classic"
        )
    
        const Prime = seats.filter(seat =>
            seat.type == "prime"
        )
    
        const Recliner = seats.filter(seat =>
            seat.type == "recliner"
        )
    
    
        return res.status(200).json({
            message:"Here is Your All Seats",
            data:{
                classic:Classic,
                recliner:Recliner,
                prime:Prime
            },
            success:true
        })
    } catch (error) {
        return next(error)
    }
}