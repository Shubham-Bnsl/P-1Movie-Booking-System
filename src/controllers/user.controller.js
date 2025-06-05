import jwt from "jsonwebtoken";
import errorHandler from "../../utility/errorHandler.js";
import { User } from "../modals/user.modal.js";
import 'dotenv/config'


const generateAccessRefreshToken = (user) => {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        return { accessToken, refreshToken }
}


export const CreateUser = async (req, res, next) => {

        // email,name req.body
        // find in user userschema if it found return user already present
        // password encrypt
        // create newuser and update
        try {

                const { email, username, password, age } = req.body;

                if (!email || !username || !age || !password) {
                        return next(errorHandler(404, "All Fields are required"))
                }

                const user = await User.findOne({ email: email });

                if (user) {
                        return res.status(400).json({
                                message: "User already Exist"
                        })
                }


                const newUser = await User.create({
                        username: username,
                        age: req.body.age,
                        email: email,
                        phoneNumber: req.body.phoneNumber,
                        password: password,
                        avatar: req.body.avatar,
                        refreshToken: null

                });

                const modifiedUser = await User.findById(newUser._id).select('-password')

                return res.status(201).json({
                        message: "new user is created",
                        user: modifiedUser,
                })

        } catch (error) {
                return next(errorHandler("400", error))
        }

}

export const LoginUser = async (req, res, next) => {
        // get details email and password
        // check user is present or not 
        // checking password correct or not
        // generate token refresh and access 
        // then set it in cookies

        try {
                const { email, password } = req.body;

                const user = await User.findOne({ email });

                if (!user) {
                        return next(errorHandler(404, "User is not registered"))
                }

                const match = await user.isPasswordCorrect(password)

                if (!match) {
                        return next(errorHandler(404, "Invalid credentails! Please Provide correct Input"))
                }

                const { accessToken, refreshToken } = generateAccessRefreshToken(user)
                // const accessToken = generateAccessToken(user)
                // const refreshToken = generateRefreshToken(user)


                user.refreshToken = refreshToken;

                const newUser = await User.findById(user._id).select('-password -refreshToken')

                await newUser.save();



                return res
                        .status(201)
                        .cookie('accessToken', accessToken, { secure: true, httpOnly: true })
                        .cookie('refreshToken', refreshToken, { secure: true, httpOnly: true })
                        .json({
                                message: "User is Logged in",
                                user: newUser,
                                success: true,
                        })


        } catch (error) {
                return next(errorHandler(404, "something went wrong while login"));
        }

}

export const Logout = async (req, res, next) => {
        // get user from req.user 
        // auth -> req.user = email
        // set user refreshtoken to null
        // clear cookies
        //
        try {

                const user = req.user

                if (!user) {
                        return next(errorHandler(401, "Unauthorized request"))
                }

                user.refreshToken = null;
                await user.save();

                res
                        .status(200)
                        .clearCookie('accessToken')
                        .clearCookie('refreshToken')
                        .json({
                                message: "User is logged out",
                                success: true
                        })

        } catch (error) {
                return next(errorHandler(400, "Something wrong happend while logout"))
        }
}


export const refreshTokenHandler = async (req, res, next) => {

        // take refresh token from req.cookies
        // if not present throw error
        // verify it from jwt
        // get id from token
        // find user by id 
        // generate refreshToken ,accesstoken and set users refreshToken 
        // save user
        // return and set cookie
try {
        
                const { refreshToken } = req.cookies
        
                if (!refreshToken) {
                        return next(errorHandler(401, "refresh token not found! Please login in"))
                }
        
                const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
        
                const { _id } = payload
        
                const user = await User.findById({ _id })
        
                if (!user) {
                        return next(errorHandler(404, "User not found!Please log in"))
                }

                if(refreshToken !== user.refreshToken){
                        return next(errorHandler(403,"Refresh token is expired or used"))
                }
        
                const token = generateAccessRefreshToken(user)
        
                const newAccessToken = token.accessToken
                const newRefreshToken = token.refreshToken
        
        
                user.refreshToken = newRefreshToken;
                await user.save();
        
                return res
                        .status(200)
                        .cookie('accessToken', newAccessToken, { secure: true, httpOnly: true })
                        .cookie('refreshToken', newRefreshToken, { secure: true, httpOnly: true })
                        .json({
                                message: "Access token is generated",
                                success: true
                        })
        
} catch (error) {
        return next()
}

}


