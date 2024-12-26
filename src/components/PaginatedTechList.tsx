import { useState, FC } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { TechPercentage } from "@/lib/types";

const ITEMS_PER_PAGE = 5;

interface PaginatedTechListProps<T> {
    technologies: T[];
    renderTech: (tech: T, index: number) => React.ReactNode;
}

const PaginatedTechList: FC<PaginatedTechListProps<TechPercentage>> = ({ technologies, renderTech }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const pageCount = Math.ceil(technologies.length / ITEMS_PER_PAGE);

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1));
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    const paginatedTechs = technologies.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                {paginatedTechs.map(renderTech)}
            </div>
            {pageCount > 1 && (
                <div className="flex justify-between items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-zinc-500">
                        {currentPage + 1} / {pageCount}
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={currentPage === pageCount - 1}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}

export default PaginatedTechList;