"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = () => {
    router.push(`?search=${search}`);
  };

  return (
    <div className="flex gap-2 my-4">
      {/* Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="border px-3 py-2 rounded w-full"
      />

      {/* Button */}
      <button
        onClick={handleSearch}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;