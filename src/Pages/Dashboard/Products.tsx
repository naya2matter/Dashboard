import { useContext, useEffect, useState } from "react"
import { GoPlusCircle } from "react-icons/go"
import { Link } from "react-router-dom"
import { SearchContext, type SearchProviderType } from "../../contexts/SearchContext"
import type { Product } from "../../interfaces/productInterface"
import Card from "../../Components/Card"
import { RingLoader} from "react-spinners"
import type { AxiosResponse } from "axios"
import axios from "axios"
import usePagination from "../../hooks/Pagination"
import Pagination from "../../Components/Pagination"
import { toast } from "react-toastify"
import Confirmation from "../../Components/Confirmation"


const Products = () => {

    const { searchInput } =useContext(SearchContext) as SearchProviderType
    const [filteredData, setFilteredData] = useState<Product[]>([]);
    const [ loading , setLoading] = useState<boolean>(true)
    const [ products , setProducts]= useState<Product[]>([])
    const [openConfirm , setOpenConfirm] = useState<Boolean>(false)
    const [selectedId, setSelectedId] = useState<number | null>(null)

    const [token] = useState<String>(localStorage.getItem('token') || '')

    // ===========  Search ==============

    useEffect(() => {
    if (searchInput) {
        setFilteredData(
            products.filter(item =>
            item.name.toLowerCase().includes(searchInput.toLowerCase())
            )
        );
        setCurrentPage(1);
        } else {
        setFilteredData(products);
        }
    }, [searchInput, products]);

    // ===========  Pagination ==============

    const { currentData, currentPage, totalPages, setCurrentPage } =
        usePagination({
            data: filteredData,
            itemsPerPage: 4,
        });
    
    // ===========  Get Data ==============

    const getProducts= async():Promise<void>=>{
        try {
            const response: AxiosResponse<Product[]>=await axios.get(
                'https://vica.website/api/items',
                {headers:{
                    Accept:'application/json',
                    Authorization:`Bearer ${token}`
                }
                }
            )
            setProducts(response.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(()=>{
        setLoading(true)
        getProducts()
    },[])


    // ===========  Deleted product ==============
    const handleAskDelete = (id:number) => {
        setSelectedId(id)
        setOpenConfirm(true)
    }

    const deleteProduct = async () => {
        if (!selectedId) return;
        setLoading(true);

        try {
            await axios.delete(`https://vica.website/api/items/${selectedId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Product deleted successfully");
            getProducts();
            setOpenConfirm(false);
        } catch (error) {
            toast.error("Failed to delete product");
        } finally {
            setLoading(false);
        }
    };

    
    return (
        <div className="bg-[#F5F6FA] dark:bg-[#1B2431] dark:text-white p-6 flex flex-col gap-8" style={{ minHeight: "calc(100vh - 66px)" }}>
            <div className="flex justify-between">
                <h1 className="text-4xl font-semibold dark:text-white">All Products</h1>
                <Link to={"/dashboard/create"} className=" bg-[#3e71e9] text-white rounded-md w-[180px] h-10 flex items-center justify-center gap-2 font-semibold  outline-none  hover:brightness-110 hover:animate-pulse  py-3 px-2  shadow-lg shadow-indigo-500/50">
                    <GoPlusCircle fontSize={20} /> Create Products
                </Link>
            </div>

            <div className="flex-1 flex gap-6 flex-wrap">
                {loading && (
                    <RingLoader
                        color="#4880FF"
                        loading={loading}
                        size={100}
                        className="m-auto"
                    />
                ) }
                {!loading && !products?.length && (
                    <h2 className=" mx-auto text-3xl font-bold">
                        There are no products ...
                    </h2>
                    )
                }
                {!loading && currentData?.map((product)=>(
                    <Card key={product.id} id={product.id} name={product.name} price={product.price} image_url={product.image_url}  onDelete={handleAskDelete}/>
                ))}
                {/* Confirmation Modal */}
                {openConfirm && (
                    <Confirmation
                        message="Are you sure you want to delete this product?"
                        onCancel={() => setOpenConfirm(false)}
                        onConfirm={deleteProduct}
                        loading={loading}
                    />
                )}

            </div>
            
            <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
            />
            
        </div>
    )
}

export default Products
