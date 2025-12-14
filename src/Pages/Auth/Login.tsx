import axios from "axios"
import { useRef, useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import type { UserDtos } from "./Register"
import { toast } from "react-toastify"

const Login = () => {
    const navigate=useNavigate()
    // references to inputs
    const logEmailRef =useRef<HTMLInputElement|null>(null)
    const logPasswordRef =useRef<HTMLInputElement|null>(null)

    const [loading, setLoading] = useState(false)

    // ============================
    //  توليد device_id وتخزينه تم طلبه من ال  bach end  عند الاختبار
    // ============================
    let deviceId = localStorage.getItem("device_id");

    if (!deviceId) {
        // crypto.randomUUID → ينشئ ID فريد
        deviceId = crypto.randomUUID();
        localStorage.setItem("device_id", deviceId);
    }
    // ============================
    //  Handle Login
    // ============================
    const handleLogin =(event:FormEvent)=>{
        event.preventDefault()
        setLoading(true)

        const user:UserDtos={
            email: logEmailRef.current?.value || '',
            password: logPasswordRef.current?.value ||'',
            // إضافة device_id لأن bachend يطلبه
            device_id: deviceId
        }

        axios.post('https://vica.website/api/login' , user)
        .then((res)=>{
            localStorage.setItem('token',res.data.data.token)
            localStorage.setItem('user' , JSON.stringify(res.data.data.user))
            // toast.success('You have been logged in successfully', {
            //     position: 'top-right',
            //     className:'text-sm text-black/80',
            // })
            navigate('/dashboard', { replace: true })
        })
        .catch((error)=>{
            const message = error?.response?.data?.message || "Something went wrong"
            toast.error(message,{
                position: 'top-right',
                className:'text-sm text-black/80',
            })
        })
        .finally(()=>{
            setLoading(false)
        })
    }


    return (
        <div className="pt-6 pb-4 px-8 min-w-[450px] min-h-[550px] flex flex-col gap-8 bg-white">
            
            <div className=" text-center">
                <h1 className="font-extrabold text-2xl">Login to Account</h1>
                <p className="font-semibold text-sm mt-2 text-black/80">Please enter your email and password to continue</p>
            </div>

            <form className=" flex flex-1 flex-col justify-between" onSubmit={handleLogin}>
                <div className=" flex flex-col gap-8">
                    <div>
                        <label htmlFor="email" className="font-semibold block mb-2 text-black/80">Email address:</label>
                        <input type="email" name="email" id="email" ref={logEmailRef} placeholder="example@gmail.com" required className=" bg-[#f1f3fb] text-gray-400 border border-gray-300 w-full h-12 rounded-lg px-4 outline-none shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300"/>
                    </div>
                    <div>
                        <label htmlFor="password" className="font-semibold block mb-2 text-black/80">Password:</label>
                        <input type="password" name="password" id="password" ref={logPasswordRef} placeholder="********" required className=" bg-[#f1f3fb] text-gray-400 border  border-gray-300 w-full h-12 rounded-lg px-4 outline-none shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300"/>
                    </div>
                </div>
                <div>
                    <button type="submit" className="text-white bg-[#4880ff] rounded-lg w-[300px] h-[47px] flex items-center justify-center mx-auto mb-2 font-bold text-lg cursor-pointer hover:brightness-110 hover:animate-pulse  py-3 px-6   shadow-lg shadow-indigo-500/50">
                        {loading ? 
                            <ClipLoader
                            color={'#fff'}
                            loading={loading}
                            size={20}
                            className="m-auto"
                            speedMultiplier={0.7}
                            />
                        : 
                            'Sign In'
                        }
                    </button>
                    <p className=" text-center text-black/80 mt-2">
                        Don't have an account? 
                        <Link to='/register' className=" font-bold underline text-[#4880ff]"> Create Account</Link>
                    </p>
                </div>
            </form>
        
        </div>
    )
}

export default Login
