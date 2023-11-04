import React from "react";
import "./pagination.css";

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

function Pagination({ count, page, onChange }: PaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= count; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <span key={number} className="page-item">
          <button
            onClick={(event) => onChange(event, number)}
            className={`page-link ${page === number ? "active" : ""}`}
          >
            {number}
          </button>
        </span>
      ))}
    </ul>
  );
}

export default Pagination;