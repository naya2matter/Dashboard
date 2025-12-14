import { MdOutlineFileUpload } from "react-icons/md"
import type { ProductFormProps } from "../interfaces/productInterface"
import { useRef, useState, type FormEvent } from "react"
import { ClipLoader } from "react-spinners"

const ProductForm = ({initialData,onSubmit,loading}:ProductFormProps) => {
    const nameRef    =useRef<HTMLInputElement|null>(null)
    const priceRef   =useRef<HTMLInputElement|null>(null)
    const imageRef   =useRef<HTMLInputElement|null>(null)

    const [previewImage , setPreviewImage] = useState<string>(initialData?.image_url || "")
    
    // ===========  image preview ==============

    const handleImageChange =()=>{
        const file=imageRef.current?.files?.[0]
        if(file){
            setPreviewImage(URL.createObjectURL(file));
        }
    }

    const sendData=(e:FormEvent)=>{
        e.preventDefault()
        const data={
            name  : nameRef.current?.value ||'',
            price : priceRef.current?.value ||'',
            image : imageRef.current?.files?.[0] || null,
        }
        onSubmit(data)
    }

    return (
        <form onSubmit={sendData} >
            <div className="flex justify-between ">

                <div className="w-[40%]">

                    <div  className="flex flex-col grow justify-between">  
                        <label htmlFor="productName" className=" font-medium text-[18px] pb-2.5 text-[#595b5f] dark:text-[#b1b7c0]">Product Name :</label>
                        <input type="text"
                            id="productName" 
                            defaultValue={initialData?.name}
                            ref={nameRef}
                            placeholder="Enter Product Name" 
                            className="h-12 text-[#b1b7c0] rounded-xl ps-4 border-[#e0e2e5] bg-[#f1f3fb] dark:bg-[#313d4e] border focus:border-sky-950 "
                            required
                        />
                    </div>

                    <div  className="flex flex-col grow justify-between">
                        <label htmlFor="productPrice"className=" font-medium text-[18px] py-2.5 text-[#595b5f] dark:text-[#b1b7c0]">Product Price :</label>
                        <input type="number"
                            id="productPrice" 
                            defaultValue={initialData?.price}
                            ref={priceRef}
                            placeholder="Enter Product Price" 
                            className="h-12 text-[#b1b7c0] rounded-xl ps-4 border-[#e0e2e5] bg-[#f1f3fb] dark:bg-[#313d4e] border focus:border-sky-950 "
                            required
                        />
                    </div>

                </div>

                <div className=" w-[50%] ">

                    <label htmlFor="image" 
                    className="w-full h-full flex justify-center items-center flex-col border-dashed border rounded-xl border-[#abc4f7] dark:text-white cursor-pointer">
                    {previewImage ? (
                            <img src={previewImage} alt="Preview" className="max-h-64 object-contain" />)
                            : (
                            <>
                                <MdOutlineFileUpload className="text-[#5482e1] text-6xl" />
                                <br />
                                Upload Product Image
                            </>
                        )}
                    
                    </label>

                    <input type="file" id="image"  ref={imageRef} onChange={handleImageChange} className="hidden"/>

                </div>
            </div>
            <button type="submit" className="cursor-pointer w-[200px] h-[47px] mt-6 bg-[#e0eaf8] dark:bg-[#313d4e] dark:text-white rounded-xl text-2xl text-black">
                {
                    loading ?
                        (<ClipLoader
                        color={'#fff'}
                        loading={loading}
                        size={20}
                        className="m-auto"
                        speedMultiplier={0.7}
                        />)
                    : 
                        initialData ? 
                            ("Edit") 
                            : 
                            ("Create")
                    
                }
            </button>        
        </form>
    )
}

export default ProductForm
