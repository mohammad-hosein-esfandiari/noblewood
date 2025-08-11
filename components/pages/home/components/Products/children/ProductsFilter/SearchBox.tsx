import { useProductStore } from "@/store/products";
import { Search, X } from "lucide-react";
import React, { useState } from "react";

export default function SearchBox() {
  const {queries, setQuery ,resetQueries , loading} = useProductStore();
  const [searchQuery, setSearchQuery] = useState(queries.search || "");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery("search", searchQuery.trim() || "");
  }






  return (
    <div className="shrink-0 sm:items-end sm:justify-end flex items-center justify-center">
      <form onSubmit={handleSearch} className="rounded-xl flex items-center min-w-[200px] gap-2  px-2 py-1">
        <div className="relative peer">

        <input
          type="text"
          className="border border-gray-300 h-12 peer px-4 pr-8 text-sm placeholder:text-[14px] placeholder:text-gray-400 rounded-xl focus:outline-amber-300 outline-amber-300  outline-[0.5px] transition-all duration-300 w-full"
          placeholder="Search by Title or SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          
        />
            {queries.search && (
          <button
            type="button"
            onClick={()=>resetQueries("search")}
            className="text-gray-500  absolute top-1/2 -translate-y-1/2 right-4 hover:text-gray-700 transition "
            aria-label="Clear search input"
            >
            <X className="w-4 h-4" />
          </button>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="group cursor-pointer h-12 w-12 disabled:opacity-[0.5]  border-2 border-amber-300   bg-amber-300    backdrop-blur-sm bg-white/5 hover:shadow-xl transition-transform duration-300 flex items-center justify-center rounded-xl "
          aria-label="Search"
        >
          <Search className="w-5 h-5  text-amber-800" />
        </button>
      </form>
    </div>
  );
}
