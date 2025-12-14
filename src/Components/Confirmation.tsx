import { ClipLoader } from "react-spinners"
import type { ConfirmationProps } from "../interfaces/productInterface"

const Confirmation = ({ message, onConfirm, onCancel , loading = false, }: ConfirmationProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={!loading ? onCancel : undefined}       
        />

        {/* Modal */}
        <div className="relative bg-white dark:bg-[#1a2432] rounded-lg p-6 w-[300px] shadow-lg">
            <p className="text-center text-lg font-medium mb-6 dark:text-white">
                {message}
            </p>

            <div className="flex justify-between">
                <button
                    onClick={onCancel}
                    disabled={loading}
                    className="w-[100px] py-2 rounded text-black   flex items-center justify-center  bg-gray-300 hover:bg-gray-400"
                >
                    No
                </button>

                <button
                    onClick={onConfirm}
                    disabled={loading}
                    className="w-[100px] py-2 rounded bg-red-500 text-white hover:bg-red-600 flex items-center justify-center  "
                >
                    {loading ? 
                            <ClipLoader
                            color={'#fff'}
                            loading={loading}
                            size={20}
                            className="m-auto"
                            speedMultiplier={0.7}
                            />
                        : 
                            'Yes'
                        }
                </button>
            </div>
        </div>
        </div>
    )
}

export default Confirmation
