const addToCartModel = require("../../models/cartProduct")

const addToCartController=async(req,res)=>{
    try{
        const{productId} =req?.body
        const currentUser =req.userId

        const isProductAvailable=await addToCartModel.findOne({
            productId
        })

        if(isProductAvailable){
            return res.json({
                message:'Already exists in the add to cart',
                success:false,
                error:true
            })
        }

        const payload ={
            productId,
            userId:currentUser,
            quantity:1,
        }

        const newAddToCart =await addToCartModel(payload)
        const saveProduct=newAddToCart.save()

        res.json({
            data:saveProduct,
            message:'Product Added in Cart',
            success:true,
            error:false

        })

    }catch(err){
        res.json({
            message:err?.message || err,
            error:true,
            success:false
        })
    }
}

module.exports=addToCartController