import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function Posts({handleTotalPages, currentPageNumber = 1}) {

  console.log('currentPageNumber', currentPageNumber)
  // let noPostMessage = useRef();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [paginatedPostData, setPaginatedPostData] = useState([])


  useEffect(() => {
    const getPostData = async () => {
      try {
        setLoading(true)
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPosts(response.data);
        setTotalPages(Math.ceil(response?.data?.length/10));
        handleTotalPages(Math.ceil(response?.data?.length/10));
      } catch {
        // noPostMessage.current.value = 'No Data available for posts.';
      } finally {
        setLoading(false)
      }
    }
    getPostData();
  }, [])

  // useEffect(())

  useEffect(() => {
    if(posts.length) {
      const postsToShow = JSON.parse(JSON.stringify(posts));
      // const lastIndex = Math.min((postsPerPage * currentPage) - 1, posts.length-1);
      const startIndex = (currentPageNumber * postsPerPage) - postsPerPage;
      const post = postsToShow.splice(startIndex, currentPageNumber === totalPages ? posts.length - startIndex : postsPerPage)
      setPaginatedPostData(post)
    }
  }, [posts, currentPageNumber])
  // 
  return (
    <div>
      {loading && <p> Loading ... </p>}
      {!loading && <ul>{paginatedPostData.map(post => <li className="single-post-style" key={post.id}>{post.body} </li>)}</ul>}
    </div>
  )
}

export default Posts
