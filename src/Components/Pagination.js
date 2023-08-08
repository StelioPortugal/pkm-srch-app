import React from "react";

const Pagination = ({ currentPage, totalPages, handlePreviousPage, handleNextPage }) => {
  return (
    <div id="pagination">
      Page {currentPage} of {totalPages}
      <button
        id="previous"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        id="next"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;