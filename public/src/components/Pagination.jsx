import { useState } from 'react';

export default function Pagination({ totalPage, currentPage, onPageChange }) {
  const renderPageNumber = () => {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          disabled={i === currentPage}
          className={`py-2 px-4 border  ${
            i === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500'
          } hover:bg-blue-300`}
        >
          {i}
        </button>,
      );
    }

    return pages;
  };

  return (
    <>
      <div className="join flex justify-center">
        {/* <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="1"
          defaultChecked
        /> */}

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-l-md"
        >
          «
        </button>
        {renderPageNumber()}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
          className="px-4 py-2 border rounded-r-md"
        >
          »
        </button>
      </div>
    </>
  );
}
