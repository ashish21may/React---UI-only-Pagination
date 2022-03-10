import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function Posts({ handleTotalPages, currentPageNumber = 1 }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [paginatedPostData, setPaginatedPostData] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
        setTotalPages(Math.ceil(response?.data?.length / 10));
        handleTotalPages(Math.ceil(response?.data?.length / 10));
      } catch {
        // Error handling can be done here
      } finally {
        setLoading(false);
      }
    };
    getPostData();
  }, []);

  useEffect(() => {
    if (posts.length) {
      const postsToShow = JSON.parse(JSON.stringify(posts));
      const startIndex = currentPageNumber * postsPerPage - postsPerPage;
      const post = postsToShow.splice(
        startIndex,
        currentPageNumber === totalPages
          ? posts.length - startIndex
          : postsPerPage
      );
      setPaginatedPostData(post);
    }
  }, [posts, currentPageNumber]);
  //
  return (
    <div>
      {loading && <p className="center-text"> Loading ... </p>}
      {!loading && (
        <ul>
          {paginatedPostData.map((post) => (
            <li className="single-post-style" key={post.id}>
              {post.body}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Posts;
