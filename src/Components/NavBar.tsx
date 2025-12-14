import {  CiSearch } from "react-icons/ci";
import { useSearch } from "../contexts/SearchContext";
import { useTheme } from "../contexts/ThemeContext";
import type React from "react";
import { IoSunny } from "react-icons/io5";
import { PiMoonFill } from "react-icons/pi";

const NavBar:React.FC = () => {

    const { searchInput, setSearchInput } = useSearch()
    const { theme, setTheme } = useTheme()

    let userInfo={
    image: "",
    first_name: "",
    last_name: "",
    user_name: ""
    }

    const stored = localStorage.getItem("user");
    if ( stored != null) {
        let data = JSON.parse(stored);
        userInfo.first_name = data?.first_name 
        userInfo.last_name = data?.last_name
        userInfo.user_name = data?.user_name
        userInfo.image = data?.profile_image_url
    }


    const handleThemeChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }
    return (
        <nav className="  flex justify-between items-center px-6 py-3 dark:bg-dark-mainBackground dark:text-dark-mainText">
            <div className="relative w-full max-w-md ">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <CiSearch className="w-5 h-5" />
                </span>
                <input
                    type="search"
                    placeholder="search product..."
                    value={searchInput}
                    onChange={(e)=>setSearchInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border  shadow-lg dark:shadow-[#49576b]  dark:bg-[#313d4e] border-gray-300 bg-[#f4f6fa]  rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex gap-6 items-center">
                <img src={ userInfo.image } alt="Profile" className="w-10 h-10 rounded-full object-contain" />
                <div>
                    <p className="text-[20px] font-medium text-black dark:text-dark-mainText">{ userInfo.first_name } { userInfo.last_name }</p>
                    <p className=" text-black  dark:text-dark-mainText">{ userInfo.user_name }</p>
                </div>
                |
                <button className="cursor-pointer" onClick={handleThemeChange}>
                    {theme=='dark' ? <IoSunny className=" text-yellow-400" size={25} /> : <PiMoonFill className=" text-gray-700" size={25}/>}
                </button>
            </div>
        </nav>
    )
}

export default NavBar
