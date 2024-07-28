import React from 'react';

export default function Pagination({ pageNo, setPageNo, totalPages }) {
  const prevArr = Array.from(
    { length: 3 },
    (_, index) => pageNo - 1 - index
  )
    .filter((value) => value > 0)
    .reverse();

  const nextArr = Array.from({ length: 4 }, (_, index) => pageNo + index);
  const paginationArr = [...prevArr, ...nextArr].filter(value => value <= totalPages);

  const handleNext = () => {
    if (pageNo < totalPages) {
      setPageNo(pageNo + 1);
    }
  };

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  return (
    <div className="pagination-container">
      {pageNo > 1 && (
        <div onClick={handlePrev} className="page-btn">
          {"<"}
        </div>
      )}
      {paginationArr.map((value) => (
        <div
          onClick={() => setPageNo(value)}
          className={value === pageNo ? 'page-btn active' : 'page-btn'}
          key={value}
        >
          {value}
        </div>
      ))}
      {pageNo < totalPages && (
        <div onClick={handleNext} className="page-btn">
          {">"}
        </div>
      )}
    </div>
  );
}
