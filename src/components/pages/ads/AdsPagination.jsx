import React from "react";

export default function AdsPagination({
  currentPage,
  setCurrentPage,
  totalAds,
}) {
  const totalPages = parseInt(Math.ceil(totalAds / 5));

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
              aria-label="Goto Page 1"
              className="inline-flex h-10 items-center justify-center gap-4 stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-gray-50 hover:stroke-gray-500 hover:text-gray-500 focus:bg-gray-50 focus:stroke-gray-600 focus:text-gray-600 focus-visible:outline-none"
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
          {[...Array(totalPages).keys()].map((value, index) => (
            <li key={index}>
              <button
                className="hidden h-10 items-center justify-center whitespace-nowrap bg-gray-500 px-4 text-sm font-medium text-white transition duration-300 hover:bg-gray-600 focus:bg-gray-700 focus-visible:outline-none md:inline-flex"
                aria-label={`Current Page, Page ${index}`}
                aria-current="true"
                value={value}
              >
                {index + 1}
              </button>
            </li>
          ))}

          {/* next button */}
          <li>
            <button
              aria-label="Goto Page 4"
              className="inline-flex h-10 items-center justify-center gap-4 stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-gray-50 hover:stroke-gray-500 hover:text-gray-500 focus:bg-gray-50 focus:stroke-gray-600 focus:text-gray-600 focus-visible:outline-none"
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
