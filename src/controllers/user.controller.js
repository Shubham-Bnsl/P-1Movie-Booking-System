import { User } from "../modals/user.modal.js";


function refreshToken() {
        const token = jwt.sign(
                { data: email,username},
                 'secret',
                { expiresIn: 60 * 60 }
        );
}

export const CreateUser = async (req, res) => {

        // email,name req.body
        // find in user userschema if it found return user already present
        // password encrypt
        // create newuser and update

        const { email, username, password } = req.body;

        const user = await User.findOne({ email: email });

        if (user) {
                return res.status(400).json({
                        message: "User already Exist"
                })
        }


        const encryptPassword = User.generateEncryptPassword(password);

        const newRefreshToken = refreshToken()


        const newUser = await User.create({
                name: name,
                age: req.body.age,
                email: email,
                phoneNumber: req.body.phoneNumber,
                password: encryptPassword,
                avatar: req.body.avatar,
                refreshToken: null

        })



} 
