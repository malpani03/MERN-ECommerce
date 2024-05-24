const ProductModel =require('../../models/productModel')
const getProductController=async(req,res)=>{
    try{
        const allProduct =await ProductModel.find().sort({createdAt :-1})

        res.json({
            message:"All Product",
            data:allProduct,
            error:false,
            success:true
            })

    }catch(err) {
        res.status(400).json({
          message: err.message || err,
          error: true,
          success: false,
        });
      }
    }

    module.exports=getProductController