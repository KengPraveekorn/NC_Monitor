import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import Pagination from "../functions/Pagination";

// routes auth
import { listnc } from "../functions/auth";

const TPagination = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [searchLot, setSearchLot] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    listnc()
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderData = (data) => {
    return data.map((item, idx) => {
      return (
        <div key={idx}>
          <img src={item.picture.thumbnail} alt="" /> {item.name.first}
          <hr />
        </div>
      );
    });
  };

  // Get current value
  const indexOfLastPost = currentPage * postsPerPage; // 1 * 10 = 10
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 10 - 10 = 0
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost); // 0 to 10

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Posts
        posts={currentPosts}
        loading={loading}
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts?.length}
        paginate={paginate}
      />
      {/* {currentPosts} */}
    </div>
  );
};

export default TPagination;
