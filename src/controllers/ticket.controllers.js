import errorHandler from "../../utility/errorHandler.js"
import { Seat } from "../models/seat.model.js";
import { Ticket } from "../models/ticket.model.js"

export const bookingTicket = async (req, res, next) => {
try {
    
        const {seats,showId} = req.body
    
        const userId = req.user._id;
    
        if(!seats || !Array.isArray(seats) || seats.length==0 || !showId){
            return next(errorHandler(400,"Required Data is missing"))
        }
    
        const seatDocs =await Seat.find({_id:{ $in: seats}})
    
        if(seatDocs.length !==seats.length){
            return next(errorHandler(400,"some Seats are invalid"))
        }
    
        const totalPrice = seatDocs.reduce((sum,seats) => sum+seats.price,0)
    
        const newTicket = await Ticket.create({
            userId,
            seats,
            price:totalPrice,
            date :new Date(),
            status:"booked",
            showID:showId
        })
    
    
        return res.status(200).json({
            message:"Ticket booked Successfully",
            newTicket
        })
} catch (error) {
    return next(error);
}

}   