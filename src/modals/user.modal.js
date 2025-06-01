import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        lowecase:true,
        unique: true
    },
    age:{
        type: Number,
        required: true,
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default:"https://pbs.twimg.com/profile_images/1707398013398974464/lu87Drbo_400x400.jpg"
    },
    refreshToken:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


userSchema.pre('save',async function(next){

        if(!this.isModified('password')){
            return next();
        }

        this.password = await bcrypt.hash(this.password, 10);
        next();
        
}) 
    



export const User = mongoose.model("User",userSchema);



