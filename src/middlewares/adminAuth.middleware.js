import errorHandler from "../../utility/errorHandler.js";
import { User } from "../modals/user.modal.js";

const adminAuth = async(req,res,next)=>{
    try {


        const {_id} = req.user;

        const user = await User.findById(_id);

        if(!user){
            return next(errorHandler(400,"User not found in admin auth"))
        }

        const {isAdmin} = user

        if(isAdmin){
            return next();
        }
        else{
            return next(errorHandler(400,"Only Admin can make changes"))
        }
    } catch (error) {
        return next(error)
    }

}

export default adminAuth;