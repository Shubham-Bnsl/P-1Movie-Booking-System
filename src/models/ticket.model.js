import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    seats:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seat",
        required:true,
    }],
    price:{
        type:Number,
        required:true,
    },
    date:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['booked','cancelled'],
        required:true
    },
    showID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Show",
        required:true
    },

},{timestamps:true})

export const Ticket = mongoose.model('Ticket',ticketSchema) 