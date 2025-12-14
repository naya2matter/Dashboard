import { Link } from "react-router-dom"
import type { CardProps } from "../interfaces/productInterface"
import { CiTrash } from "react-icons/ci"

const Card = ({id ,image_url, name,price ,onDelete}:CardProps) => {
    
    return (
        <div key={id} className=" p-4 max-w-[250px]  h-[300px] rounded-lg bg-white dark:bg-[#273142] shadow-2xl flex-col flex gap-4 border border-gray-300 hover:shadow-lg hover:border-blue-300">
                <img src={image_url} alt="product_image" className="w-[215px] h-[120px] object-contain self-center"/>
                <h2 className="text-[18px] font-bold" >{name}</h2>
                <p className="text-[#739bff] font-bold pb-3">$ {price}</p>
                <div className=" flex justify-between ">
                    <Link to={`/dashboard/edit/${id}`} className="text-xs w-[130px] text-center font-bold bg-[#E2EAF8] dark:bg-[#4B5668] rounded-2xl py-1.5 px-5">Edit Prodect</Link>
                    <button  onClick={() => onDelete(id)} ><CiTrash className="text-2xl cursor-pointer"/></button>
                </div>
        </div>
    )
}

export default Card
