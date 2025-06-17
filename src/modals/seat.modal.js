import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({

    type:{
        type:String,
        enum:['classic','prime','recliner'],
        required:true,
        lowercase:true
    },
    number:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    hall:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hall'
    },

})

export const Seat = mongoose.model("Seat",seatSchema) 