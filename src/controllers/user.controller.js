import { User } from "../modals/user.modal.js";


export const CreateUser = async (req, res) => {

        // email,name req.body
        // find in user userschema if it found return user already present
        // password encrypt
        // create newuser and update
        try {

                const { email, username, password } = req.body;

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
                        password:password,
                        avatar: req.body.avatar,
                        refreshToken: null

                });

                const modifiedUser  = await User.findById(newUser._id).select('-password')

                return res.status(201).json({
                        message: "new user is created",
                        user:modifiedUser,
                })

        } catch (error) {
                return res.status(400).json({
                        message: error.message,
                        error
                })
        }

} 

export const LoginUser = async (req,res,next) =>{

}
