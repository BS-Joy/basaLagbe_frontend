import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function AdsPagination({
  currentPage,
  setCurrentPage,
  totalAds,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = parseInt(Math.ceil(totalAds / 5));

  const handlePagination = (selectedPage) => {
    const currentParams = Object.fromEntries([...searchParams]);
    if (selectedPage > 1) {
      setSearchParams({ ...currentParams, page: selectedPage });
      setCurrentPage(selectedPage);
      window.scrollTo(660, 660);
    } else {
      const { page, ...others } = currentParams;
      setCurrentPage(1);
      setSearchParams(others);
      window.scrollTo(660, 660);
    }
  };

  return (
    <>
      {/*<!-- Component: Outline elevated pagination --> */}
      <nav
        role="navigation"
        aria-label="Pagination Navigation"
        className="flex items-center overflow-hidden rounded border border-slate-200 shadow-md shadow-slate-200"
      >
        <ul className="flex list-none items-center justify-center divide-x divide-slate-200 text-sm text-slate-700">
          {/* previous button */}
          <li>
            <button
              onClick={() => handlePagination(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Goto Previous Page"
              className={`inline-flex h-10 items-center justify-center gap-4 stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-slate-100 hover:stroke-gray-500 focus:bg-slate-100 focus:stroke-[#34445B] focus:text-[#34445B] focus-visible:outline-none disabled:cursor-not-allowed ${
                currentPage === 1 ? "" : ""
              }`}
            >
              <span className="order-2 md:sr-only">Prev</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-mx-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                role="graphics-symbol"
                aria-labelledby="title-43 desc-43"
              >
                <title id="title-43">Previous page</title>
                <desc id="desc-43">link to previous page</desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </li>

          {/* page numbers */}
          {[...Array(totalPages).keys()].map((value, index) => {
            // console.log(index);
            return (
              <li key={index}>
                <button
                  onClick={() => handlePagination(index + 1)}
                  disabled={currentPage === index + 1}
                  className={`flex h-10 items-center justify-center whitespace-nowrap  px-4 text-sm font-medium transition duration-300  focus-visible:outline-none md:inline-flex ${
                    currentPage === index + 1
                      ? "bg-[#33445B] text-white disabled:cursor-not-allowed"
                      : "hover:bg-slate-100 focus:bg-[#33445B] focus:text-white hover:text-[#33445B]"
                  }`}
                  aria-label={`Current Page, Page ${index + 1}`}
                  aria-current="true"
                  value={value}
                >
                  {index + 1}
                </button>
              </li>
            );
          })}

          {/* next button */}
          <li>
            <button
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Goto Next Page"
              className="inline-flex h-10 items-center justify-center gap-4 stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-slate-100 hover:stroke-gray-500 hover:text-gray-500 focus:bg-gray-50 focus:stroke-gray-600 focus:text-gray-600 focus-visible:outline-none disabled:cursor-not-allowed"
            >
              <span className="md:sr-only">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-mx-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                role="graphics-symbol"
                aria-labelledby="title-44 desc-44"
              >
                <title id="title-44">Next page</title>
                <desc id="desc-44">link to next page</desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
      {/*<!-- End Outline elevated pagination --> */}
    </>
  );
}
