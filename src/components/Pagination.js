import React, { useState, useEffect } from 'react'

function Pagination({totalPages, selectedPage}) {
  const [pages, setPages] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  // const maxPaginationBoxes = 3;

  useEffect(() => {
    if(totalPages) {
      let index = 1;
      // let lastIndex = currentPage + maxPaginationBoxes;
      const pageArray = []
      while(index <= totalPages) {
        pageArray.push(index);
        index++;
      }
      setPages(pageArray)
    }
  }, [totalPages])

  const handlePrevious = () => {
    let updatedNumber = currentPage;
    updatedNumber = Math.max(updatedNumber - 1, 1);
    setCurrentPage(updatedNumber)
    selectedPage(updatedNumber)
  }

  const handleNext = () => {
    let updatedNumber = currentPage;
    updatedNumber = Math.min(updatedNumber + 1, totalPages);
    setCurrentPage(updatedNumber)
    selectedPage(updatedNumber)
  }

  return (
    <div className="page-button-container">
      <span className="page-button" id="previous" onClick={handlePrevious}>
        Prev
      </span>

      {pages.map((page, index) => (
        <span
          className={`page-button ${page === currentPage ? 'active' : ''}`}
          id={page * index}
          onClick={() => {
            setCurrentPage(page);
            selectedPage(page);
          }}
        >
          {page}
        </span>
      ))}

      <span className="page-button" id="next" onClick={handleNext}>
        next
      </span>

    </div>
  );
}

export default Pagination
