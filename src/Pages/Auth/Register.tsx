import axios from "axios"
import { useRef, useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"
export interface UserDtos {
    first_name?: string
    last_name?: string
    user_name?: string
    password: string
    email: string
    password_confirmation?: string
    profile_image?: File | null
    device_id?:string
}
const Register = () => {
    const navigate = useNavigate()
    const firstNameRef    = useRef<HTMLInputElement | null>(null)
    const lastNameRef     = useRef<HTMLInputElement | null>(null)
    const userNameRef     = useRef<HTMLInputElement | null>(null)
    const emailRef        = useRef<HTMLInputElement | null>(null)
    const passwordRef     = useRef<HTMLInputElement | null>(null)
    const confirmationRef = useRef<HTMLInputElement | null>(null)
    const profilImgRef    = useRef<HTMLInputElement | null>(null)

    const [previwImage , setPreviwImage] = useState<string>('')
    const [loading   ,   setLoading] = useState(false)

    const handlePrewiw = ()=>{
        const file = profilImgRef.current?.files?.[0]
        if(file) {
            setPreviwImage(URL.createObjectURL(file))
        }
    }

    const CreateAcount=(event:FormEvent)=>{
        event.preventDefault()
        const user: UserDtos = {
            first_name: firstNameRef.current?.value || ''  ,
            last_name: lastNameRef.current?.value || '',
            user_name: userNameRef.current?.value || '',
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
            password_confirmation: confirmationRef.current?.value || '' ,
            profile_image: profilImgRef.current?.files?.[0] || null,
        }
        if (user.password === user.password_confirmation) {
            setLoading(true)
            axios.post('https://vica.website/api/register',user,{
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res)=>{
                localStorage.setItem('token',res.data.data.token)
                localStorage.setItem('user',JSON.stringify(res.data.data.user))
                // toast.success('Created your account successfully', {
                //     position: 'top-right',
                //     className: 'text-sm text-black/80',
                // })
                navigate('/dashboard',{replace:true})
            })
            .catch((error) => {
                console.log(error)
                const message = error?.response?.data?.message || "Something went wrong"
                toast.error(message,  {
                    position: 'top-right',
                    className:
                    'text-sm text-black/80',
                })
            })
            .finally(() => {
            setLoading(false)
            })
        }
        else {
            toast.error('Passwords do NOT match!', {
                position: 'top-right',
                className:'text-sm text-black/80',
            })
        }
    }


    return (
        <div className="pt-4 pb-4 px-8 min-w-[450px] min-h-[550px] flex flex-col gap-8 bg-white">
            <div className=" text-center">
                <h1 className="font-extrabold text-2xl">Create an Account</h1>
                <p className="font-semibold text-sm mt-2 text-black/80">Create a account to continue</p>
            </div>
            <form onSubmit={CreateAcount}>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-5">
                        <div>
                            <label htmlFor="firstName" className=" font-semibold block mb-2 text-black/80">First Name:</label>
                            <input type="text" name="firstName" id="firstName" placeholder="First Name" required ref={firstNameRef} className=" bg-[#f1f3fb] text-gray-400 border border-gray-300  h-10 rounded-lg px-4 outline-none shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300" />
                        </div>
                        <div>
                            <label htmlFor="lastName" className=" font-semibold block mb-2 text-black/80">Last Name:</label>
                            <input type="text" name="lastName" id="lastName" placeholder="Last Name" required ref={lastNameRef} className=" bg-[#f1f3fb] text-gray-400 border border-gray-300  h-10 rounded-lg px-4 outline-none shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300" />
                        </div>
                        <div>
                            <label htmlFor="userName" className=" font-semibold block mb-2 text-black/80">User Name:</label>
                            <input type="text" name="userName" id="userName" placeholder="User Name" required ref={userNameRef} className=" bg-[#f1f3fb] text-gray-400 border border-gray-300  h-10 rounded-lg px-4 outline-none shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="emailAddress" className=" font-semibold block mb-2 text-black/80">Email address:</label>
                        <input type="email" name="emailAddress" id="emailAddress" required ref={emailRef} placeholder="Email address" className=" bg-[#f1f3fb] text-gray-400 border border-gray-300 w-full h-10 rounded-lg px-4 outline-none shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300" />
                    </div>
                    <div className=" flex gap-5 ">
                        <div className="w-full">
                            <label htmlFor="password" className="font-semibold block mb-2 text-black/80">Password:</label>
                            <input type="password" name="password" id="password" placeholder="********" required ref={passwordRef} className=" bg-[#f1f3fb]  text-gray-400 border border-gray-300 w-full h-10 rounded-lg px-4 outline-none shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300"/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="confirmation" className="font-semibold block mb-2 text-black/80">Confirmation Password:</label>
                            <input type="password" name="confirmation" id="confirmation" placeholder="********" required ref={confirmationRef} className=" bg-[#f1f3fb] text-gray-400 border border-gray-300 w-full h-10 rounded-lg px-4 outline-none shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="profileImg" className="font-semibold block text-black/80">Profile Image:
                        <input type="file" required name="profileImg" id="profileImg" onChange={handlePrewiw} ref={profilImgRef} className="h-10 absolute px-4 top-1/2 left-0 opacity-0 z-20 cursor-pointer w-[90px]"/>
                        <img
                            src={previwImage || './img/profil.jpg'}
                            alt="user-img"
                            id="profileImg"
                            className="w-20 h-22 rounded-full cursor-pointer object-contain"
                        />
                        </label>
                    </div>
                </div>
                <div >
                    <button type="submit" className="text-white bg-[#4880ff] rounded-lg w-[300px] h-[47px] flex items-center justify-center mx-auto mb-2 font-bold text-lg cursor-pointer hover:brightness-110 hover:animate-pulse  py-3 px-6   shadow-lg shadow-indigo-500/50">
                        {
                            loading ?
                                <ClipLoader
                                color={'#fff'}
                                loading={loading}
                                size={20}
                                className="m-auto"
                                speedMultiplier={0.7}
                                />
                            : 
                                'Sign Up'
                            
                        }
                    </button>
                    <p className=" text-center text-black/80 mt-2">
                        Already have an account? 
                        <Link to='/' className=" font-bold underline text-[#4880ff]"> Login</Link>
                    </p>
                </div>
            </form>
        
        </div>
    )
}

export default Register
