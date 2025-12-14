import { useState, useMemo } from "react";
// usePagination hook (منطق التقطيع والحسابات)
interface UsePaginationProps<T> {
    data: T[];
    itemsPerPage: number;
    }

    const usePagination = <T,>({ data, itemsPerPage }: UsePaginationProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const currentData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    }, [data, currentPage, itemsPerPage]);

    return {
        currentPage,
        totalPages,
        currentData,
        setCurrentPage,
    };
};

export default usePagination;
