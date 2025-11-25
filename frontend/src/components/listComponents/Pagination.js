import React from "react";

function Pagination({ pagination, setFilters, filters }) {
  if (!pagination.totalPages) return null;

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };

  const pages = [];
  for (let i = 1; i <= pagination.totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        style={{ margin: "0 5px", fontWeight: filters.page === i ? "bold" : "normal" }}
      >
        {i}
      </button>
    );
  }

  return (
    <>
      <div style={{ marginTop: "20px" }}>{pages}</div>
      <p>
        Всего: {pagination.totalItems} объявлений
      </p>
    </>
  )
}

export default Pagination;
