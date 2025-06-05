import jwt from "jsonwebtoken"
import errorHandler from "../../utility/errorHandler.js"
import { User } from "../modals/user.modal.js";

const authenticate = async (req, res, next) => {

    // get access token from req.cookies
    // verify it with jwt  
    // if its not then throw erro if it is 
    // set req.user to user

    // next()
    try {

        const { accessToken } = req.cookies

        if (!accessToken) {
            return next(errorHandler(401, "Access token not found. Please login."));
        }

        const token = jwt.verify(accessToken, process.env.ACCESS_TOKEN)

        const {email} = token;

        const user = await User.findOne({email})
       

        if(!user){
            return next(errorHandler(401,"Invalid Access Token"))
        }
        
        req.user = user 
        next();

    } catch (error) {
        return next();
    }
}


export default authenticate;