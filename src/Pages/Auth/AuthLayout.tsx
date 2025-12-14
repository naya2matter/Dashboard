import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <div className="relative flex justify-center items-center">
            <img src="./img/auth-bg.png" alt="auth bg" className="h-screen w-screen  absolute top-0 left-0 z-[-1] " />
            <div className="min-w-[450px] min-h-[550px] bg-white rounded-3xl mt-[3.2%] pb-4 px-8 flex flex-col gap-8 shadow-lg ">
                <Outlet/>
            </div>
        </div>
    )
}

export default AuthLayout
