const bcrypt =require('bcryptjs');
const userModel=require('../../models/usermodel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body

        if (!email) {
            throw new Error("Please provide email");
        }
        
        if (!password) {
            throw new Error("Please provide password");
        }
        
        const user = await userModel.findOne({ email });
        
        if(!user){
            throw new Error("user not found")
        }
        
        const checkPassword=await bcrypt.compareSync(password,user.password)
        
        if(checkPassword){
            const tokenData={
                _id:user.id,
                email:user.email,
            }
            const token =await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY,{expiresIn:60 *60 * 8});

            const tokenOption={
                httpOnly:true,
                secure:true
            }
        
            res.cookie('token',token,tokenOption).json({
                message: "user login successfully",
                error: false,
                success: true,
                data: token
            });
            
        }else{
            throw new Error("password not matched")
        }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }

}

module.exports ={
    userSignInController
};