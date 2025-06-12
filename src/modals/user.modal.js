import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://pbs.twimg.com/profile_images/1707398013398974464/lu87Drbo_400x400.jpg"
    },
    refreshToken: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();

})

userSchema.methods.isPasswordCorrect = async function (password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
}

userSchema.methods.generateAccessToken = function () {

    return jwt.sign(
        { 
            _id : this._id,
            email: this.email,
            username:this.username
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '4h' });

}

userSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        { 
            _id : this._id,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: '10h' });

}




export const User = mongoose.model("User", userSchema);



// 445ddf6

// git reset --hard 445ddf6