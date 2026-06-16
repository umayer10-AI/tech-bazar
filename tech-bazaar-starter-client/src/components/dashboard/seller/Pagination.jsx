"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);

  const changePage = (page) => {
    router.push(`?page=${page}`, { scroll: false });
  };

  return (
    <div className="flex gap-2 justify-center mt-6">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {/* Pages */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => changePage(page)}
          className={`px-3 py-1 border rounded ${
            currentPage === page ? "bg-black text-white" : ""
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;