import Modal from "@/components/global/Components/Modal/Modal";
import { RawProduct } from "@/types/product";
import { Search } from "lucide-react";
import React, { useState } from "react";

export default function SearchBox() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/routes/products?search=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  }
  return (
    <div className=" shrink-0 sm:items-end sm:justify-end flex items-center justify-center">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 md:w-[500px] w-full max-w-full bg-white rounded-xl  shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Search Products</h2>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="py-6 px-5 border rounded-xl focus:ring-2 
            focus:ring-amber-500 focus:border-amber-500 bg-white/50 
            backdrop-blur-sm outline-none transition-all duration-300 w-full  mb-6"
              placeholder="Search by Title or SKU..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <div className="flex item-center  mb-4 gap-4">
              <button
                className="group border-2 border-gray-200 text-amber-800 px-5 py-2 rounded-xl font-bold text-lg hover:bg-amber-300 hover:text-amber-900 transition-all duration-500 backdrop-blur-sm bg-white/5  flex-1"
                onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button
                type="submit"
                className="group flex-1 relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white px-5 py-2 rounded-xl font-bold text-lg hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 transform  transition-all duration-500 shadow-2xl hover:shadow-amber-500/25 overflow-hidden"
                disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <div
        className="w-fit cursor-pointer hover:scale-[1.05] transition-transform duration-300 bg-slate-100 p-2 rounded-xl"
        onClick={() => setIsModalOpen(true)}>
        <Search className="text-gray-500 w-5 h-5" />
      </div>
    </div>
  );
}
