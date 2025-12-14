interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
    return (
        <div className="flex justify-center mt-10 gap-2">
        {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
            <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 rounded-full transition
                ${
                    currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-black dark:bg-[#313d4e] dark:text-white"
                }`}
            >
                {page}
            </button>
            );
        })}
        </div>
    );
};

export default Pagination;
