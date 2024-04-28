import React from "react";
import loginIcons from "../../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import SummaryApi from "../common";
import { toast } from 'react-toastify';
import { useContext } from "react";
import Context from "../context";



const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate=useNavigate();
    const {fetchUserDetails}=useContext(Context)
   

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const dataResponse=await fetch(SummaryApi.signIn.url,{
            method:SummaryApi.signIn.method,
            credentials:'include',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })

        const dataApi=await dataResponse.json();

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/');
            fetchUserDetails()
            
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }

    return (
        <section id="login">
            <div className="mx-auto container p-4">
                <div className="bg-white p-5 w-full max-w-sm mx-auto">
                    <div className="w-20 h-20 mx-auto">
                        <img src={loginIcons} alt="login icons" />
                    </div>
                    <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
                        <div className="grid">
                            <label>Email :</label>
                            <div className="bg-slate-100 p-2">
                                <input
                                    type="email"
                                    placeholder="enter your email"
                                    value={data.email}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    required
                                    name="email"
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label>Password:</label>
                            <div className="bg-slate-100 p-2 flex">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="enter your password"
                                    value={data.password}
                                    onChange={handleChange}
                                    required
                                    name="password"
                                    className="w-full h-full outline-none bg-transparent"
                                />
                                <div className="cursor-pointer text-xl" onClick={() => setShowPassword((preve) => !preve)}>
                                    <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-500'>Forgot Password?</Link>
                        </div>
                        <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] hover:bg-red-700 rounded-full hover:scale-110 transition-all mx-auto block mt-4">Login</button>
                    </form>
                    <p className="py-5">Don't have Account? <Link to={'/sign-up'} className="text-red-600 hover:text-red-700 hover:underline">Sign up</Link></p>
                </div>
            </div>
        </section>
    );
};

export default Login;
