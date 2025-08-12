import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) pages.push(i);

  return (
    <div className="flex justify-center items-center space-x-2 mt-12 animate-fade-in-up">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 transition-all duration-300 hover:scale-105"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2 py-3 text-sm text-gray-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 ${
            page === currentPage
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg border-2 border-amber-500'
              : 'text-gray-700 bg-white border-2 border-gray-200 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 py-3 text-sm text-gray-400">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 transition-all duration-300 hover:scale-105"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
