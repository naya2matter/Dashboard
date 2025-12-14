import { useNavigate, useParams } from "react-router-dom"
import ProductForm from "../../Components/ProductForm"
import { useEffect, useState } from "react"
import type { Product } from "../../interfaces/productInterface"
import axios from "axios"
import { toast } from "react-toastify"
import { RingLoader } from "react-spinners"

const EditProducts = () => {
    const navigate=useNavigate()
    const { id } = useParams();
    const [ loading , setLoading] = useState<boolean>(false)
    const [pageLoading, setPageLoading] = useState<boolean>(true);

    const [product, setProduct] = useState<Product | null>(null);
    const [token] = useState<String>(localStorage.getItem('token') || '')


    // ===== Fetch product =====
    useEffect(() => {
    if (!id) return;

        axios.get(`https://vica.website/api/items/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((res) => setProduct(res.data))
            .catch(() => toast.error("Failed to load product"))
            .finally(() => setPageLoading(false))
    }, [id, token])


    // ===== Edit product =====
    const handleEditProduct=async(data:any)=>{
        setLoading(true)

        const formData = new FormData();
        formData?.append("name", data.name);
        formData?.append("price", data.price);
        if (data.image) formData?.append("image", data.image);

        try{
            await axios.post(`https://vica.website/api/items/${id}?_method=PUT`, formData, {
                headers: { Authorization: `Bearer ${token}` , Accept:"application/json"}
            })
            navigate("/dashboard")
            toast.success("Product updated!")
        } catch {
            toast.error("Failed to update product")
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-6 bg-[#f4f6fa] dark:bg-[#1a2432] "  style={{ minHeight: "calc(100vh - 66px)" }}>
            <h1 className=" text-3xl font-semibold pb-6 dark:text-white">Edit  Product</h1>
            {pageLoading ? (
                    <RingLoader
                        color="#4880FF"
                        size={100}
                        className="m-auto"
                    />
                ) 
            : product ? (<ProductForm  initialData={product}  onSubmit={handleEditProduct} loading={loading}/>):(<p className="text-red-500">network error</p>)}
        </div>
    )
}

export default EditProducts
