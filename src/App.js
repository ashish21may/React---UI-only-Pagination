import React, { useState } from 'react';
import Pagination from './components/Pagination';
import Posts from './components/Posts';

function App() {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="App">
      <h2>React Pagination</h2>
      <Posts handleTotalPages={(pages) => setTotalPages(pages)} currentPageNumber={currentPage}/>
      <Pagination totalPages={totalPages} selectedPage={(page) => setCurrentPage(page)}/>
    </div>
  );
}

export default App;
