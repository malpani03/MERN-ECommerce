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
    }
}

export default SummaryApi;