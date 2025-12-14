import { useState } from "react"
import ProductForm from "../../Components/ProductForm"
import axios from "axios"
// import type { ProductDtos } from "../../interfaces/productInterface"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const CreateProducts = () => {
    const navigate=useNavigate()
    const [ loading , setLoading] = useState<boolean>(false)
    const [token] = useState<String>(localStorage.getItem('token') || '')

    const CreatProduct=async(data:any)=>{
        setLoading(true)
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price);
        if (data.image) formData.append("image", data.image);
        
        try {
            await axios.post('https://vica.website/api/items',formData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            navigate("/dashboard")
            toast.success("Product created!")
        } catch {
            toast.error("Failed to create product");
            setLoading(false);
        } finally{
            setLoading(false);
        }
    }

    

    return (
        <div className="p-6 bg-[#f4f6fa] dark:bg-[#1a2432] "  style={{ minHeight: "calc(100vh - 66px)" }}>
            <h1 className=" text-3xl font-semibold pb-6 dark:text-white">Create Product</h1>
            <ProductForm  onSubmit={CreatProduct} loading={loading} />
        </div>
    )
}

export default CreateProducts
