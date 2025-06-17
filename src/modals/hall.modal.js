import mongoose from "mongoose";

const hallSchema = new mongoose.Schema({

hallNumber:{
    type:Number,
    required:true,
    unique:true,
    max:4,
    min:1
},
totalSeats:{
    type:Number,
    required:true,
    max:50
},


})

export const Hall = mongoose.model("Hall",hallSchema); 