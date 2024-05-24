const productModel = require("../../models/productModel");
const uploadProductPermission=require('../../helpers/permission')

async function uploadProductController(req,res){
    try{
        const sessionUserId =req.userId
        if(!uploadProductPermission(sessionUserId)){
            return res.status(403).json({message:"You don't have permission to upload product" })
        }


        const uploadProduct =new productModel(req.body)
        const saveProduct=await uploadProduct.save()

        res.status(201).json({
            message:'Product uploaded successfully',
            data:saveProduct,
            error:false,
            success:true
        })
    }catch (err) {
        // Handle errors
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports =uploadProductController