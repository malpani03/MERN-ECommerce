const backendDomain="http://localhost:5000"

const SummaryApi={
    signUp:{
        url:`${backendDomain}/api/signup`,
        method:"POST"
    },
    signIn:{
        url:`${backendDomain}/api/signin`,
        method:"POST"
    },
    current_user:{
        url:`${backendDomain}/api/user-details`,
        method:"GET"
    },
    logout_user:{
        url:`${backendDomain}/api//userLogout`,
        method:"GET"
    },
    allUser:{
        url:`${backendDomain}/api/all-user`,
        method:"GET"
    },
    updateUser:{
        url:`${backendDomain}/api//update-user`,
        method:"POST"
        
    },
    uploadProduct:{
        url:`${backendDomain}/api/upload-product`,
        method:"POST"
    },
    allProduct:{
        url:`${backendDomain}/api/get-product`,
        method:"GET"
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method  : 'post'
    },
    categoryProduct:{
        url:`${backendDomain}/api//get-categoryProduct`,
        method:"GET"
    },
    categoryWiseProduct:{
        url:`${backendDomain}/api//category-product`,
        method:"POST"
    },
    productDetails:{
        url:`${backendDomain}/api//product-details`,
        method:"POST"
    },
    addToCartProduct:{
        url:`${backendDomain}/api/addtocart`,
        method:"POST"
    },
    addToCartProductCount:{
        url:`${backendDomain}/api/countAddToCartProduct`,
        method:"GET"
    },
    addToCartProductView:{
        url:`${backendDomain}/api/view-cart-product`,
        method:'GET'
    },
    updateCartProduct:{
        url:`${backendDomain}/api/update-cart-product`,
        method:'POST'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct:{
        url:`${backendDomain}/api/search`,
        method:'get'
    },
    filterProduct : {
        url : `${backendDomain}/api/filter-product`,
        method : 'post'
    },
}

export default SummaryApi;