import axios from "axios"
import { useState, type JSX } from "react"
import { CiPower } from "react-icons/ci"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Confirmation from "./Confirmation"

interface Items{
    title:string
    link:string
    icon:JSX.Element
}
interface SideBarProps{
    items:Items[]
}

const SideBar = ({items}:SideBarProps) => {
    const [openConfirm , setOpenConfirm] = useState<Boolean>(false)
    const [ loading , setLoading] = useState(false)
    const [token] = useState<String>(localStorage.getItem('token') || '')
    const navigate= useNavigate()


    const handleLogout =async()=>{
        setLoading(true)
        try {
            await axios.post(
                'https://vica.website/api/logout', {},
                {headers:{
                    Accept:'application/json',
                    Authorization:`Bearer ${token}`
                }
                }
            )
            localStorage.clear()

            toast.success("Logged out successfully 👋")
            navigate("/", { replace: true })
        } catch {
            toast.error("Logout failed")
        }
        finally {
            setLoading(false)
            setOpenConfirm(false)
        }
    }

    return (
        <aside className="w-[220px] h-screen fixed bg-white left-0 top-0 py-6 flex flex-col gap-8 dark:bg-dark-mainBackground dark:text-dark-mainText">
            <h1 className="text-2xl font-extrabold ml-12"><strong className="text-[#4880FF]">Dash</strong>Stack</h1>
            <ul className="flex-1 flex flex-col items-center gap-1">
                {items.map((item,index)=>(
                    <li key={index} className=" px-3 py-3 rounded-md mr-5 ml-4 ">
                        <Link to={item.link} className=" flex items-center gap-3 text-[14px] font-semibold "><p className=" text-[20px] font-bold">{item.icon}</p> {item.title}</Link>
                    </li>
                ))}
            </ul>
            <>
            <button onClick={() => setOpenConfirm(true)} className="bg-[#3e71e9] text-white rounded-md w-[180px] h-10 flex items-center justify-center gap-2 font-semibold  outline-none mx-auto hover:brightness-110 hover:animate-pulse  py-3 px-6  shadow-lg shadow-indigo-500/50">
                <CiPower size={20}/>Logout
            </button>
            {openConfirm && (
                <Confirmation
                    message="Are you sure you want to logout?"
                    onCancel={() => setOpenConfirm(false)}
                    onConfirm={handleLogout}
                    loading={loading}
                />
            )}
            </>

        </aside>
    )
}

export default SideBar
