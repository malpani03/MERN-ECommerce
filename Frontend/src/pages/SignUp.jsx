import loginIcons from "../../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from "../helpers/imagetobase65";
import SummaryApi from "../common";
import {toast } from 'react-toastify';
const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic:"",
    });

    const navigate=useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleUploadPic=async(e)=>{
        const file=e.target.files[0];

        const imagePic=await imageToBase64(file)
        setData((e)=>{
            return{
                ...data,
                profilePic:imagePic

            }
        })

        
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(data.password ===data.confirmPassword){
            const dataResponse=await fetch(SummaryApi.signUp.url,{
                method:SummaryApi.signUp.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
    
            const dataApi =await dataResponse.json();
            if(dataApi.success){
                toast.success(dataApi.message)
                navigate('/login')
            }
            if(dataApi.error){
                toast.error(dataApi.message)
            }

        }else{
            toast.error('Please check password & confirm password')
        }  
    };

    return (
        <section id="signup">
            <div className="mx-auto container p-4">
                <div className="bg-white p-5 w-full max-w-sm mx-auto">
                    <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
                        <div>
                        <img src={data.profilePic ||loginIcons} alt="login icons" />
                        </div>
                        <form>
                            <label>
                            <div className="text-xs bg-opacity-80 bg-slate-200 py-4 pb-4 pt-2 text-center absolute bottom-0 w-full cursor-pointer">
                            Upload Profile
                        </div>
                                <input type="file" className="hidden" onChange={handleUploadPic}/>
                            </label>
                        
                        </form>
                    </div>

                    <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
                        <div className="grid">
                            <label>Name :</label>
                            <div className="bg-slate-100 p-2">
                                <input
                                    type="text"
                                    placeholder="enter your name"
                                    value={data.name}
                                    onChange={handleChange}
                                    required
                                    name="name"
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                        </div>

                        <div className="grid">
                            <label>Email :</label>
                            <div className="bg-slate-100 p-2">
                                <input
                                    type="email"
                                    placeholder="enter your email"
                                    value={data.email}
                                    onChange={handleChange}
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
                                <div className="cursor-pointer text-xl" onClick={() => setShowPassword((prev) => !prev)}>
                                    <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Confirm Password:</label>
                            <div className="bg-slate-100 p-2 flex">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="enter Confirm password"
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    name="confirmPassword"
                                    className="w-full h-full outline-none bg-transparent"
                                />
                                <div className="cursor-pointer text-xl" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                    <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                                </div>
                            </div>
                        </div>
                        <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] hover:bg-red-700 rounded-full hover:scale-110 transition-all mx-auto block mt-4">Sign up</button>
                    </form>
                    <p className="py-5">Already have an Account? <Link to={'/login'} className="text-red-600 hover:text-red-700 hover:underline">Login</Link></p>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
