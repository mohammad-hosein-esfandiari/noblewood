import React, { FC } from "react";
import { ChevronDown, Filter, X } from "lucide-react";

interface HeadProps {
  isOpen: boolean;
  hasFilter: boolean;
  clearFilters: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const Head: FC<HeadProps> = ({
  isOpen,
  hasFilter,
  clearFilters,
  setIsOpen,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
          <Filter className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Filter Products</h3>
          <p className="text-sm text-gray-500">
            Find exactly what you re looking for
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {hasFilter && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-all duration-300 font-medium">
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-xl text-sm font-medium hover:bg-amber-200 transition-colors duration-300">
          <span>{isOpen ? "Hide Filters" : "Show Filters"}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};
