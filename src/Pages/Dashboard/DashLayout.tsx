import { AiOutlineProduct } from "react-icons/ai"
import SideBar from "../../Components/SideBar"
import { CiHeart } from "react-icons/ci"
import { GoListUnordered } from "react-icons/go"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import type { UserDtos } from "../Auth/Register"
import { toast } from "react-toastify"
import NavBar from "../../Components/NavBar"

const DashLayout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        const user: UserDtos = JSON.parse(localStorage.getItem('user') || '{}')
        if (!token) {
        navigate('/')
        } else {
             // تفحص إذا التوست انعرض سابقاً
            const welcomed = sessionStorage.getItem("welcomed")
            if (!welcomed && user.first_name && user.last_name) {
                toast(`Hi, ${user.first_name} ${user.last_name} 👋🏻😁`, {
                    position: 'top-right',
                    className:'text-sm text-black/80',
                })
                sessionStorage.setItem("welcomed", "true")
            }
        }
    }, [])



    
    return (
        <div className="ml-[220px] dark:bg-dark-mainBackground dark:text-dark-mainText">
            <NavBar/>
            <SideBar items={[{icon:<AiOutlineProduct /> , title:"Products" , link:"/dashboard"},
                            {icon:<CiHeart /> , title:"Favorites" , link:"/dashboard/favorites"},
                            {icon:<GoListUnordered /> , title:"Order List" , link:"/dashboard/orders"}]}/>
            <Outlet/>
        </div>
    )
}

export default DashLayout
