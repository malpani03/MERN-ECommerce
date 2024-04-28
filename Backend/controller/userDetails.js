async function userDetailsController(req,res){
    try{
        console.log('userId',req.userId)
        const user=await User.findById(req.userId)

        console.log(user);
    }catch(err){
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false 
        })
    }
}

module.exports={
    userDetailsController
}