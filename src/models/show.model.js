import mongoose from "mongoose";

const showSchema = new mongoose.Schema({

    hall:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hall",
        required:true
    },
    timing:{
        type:String,
        enum:['10am-1pm','2pm-5pm','7pm-10pm'],
        required:true
    },
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie",
        required:true,
    },
    date:{
        type:Date,
        required:true
    },

},{timestamps:true})

export const Show = mongoose.model("Show",showSchema);
