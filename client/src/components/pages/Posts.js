import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";

const Posts = ({ posts, loading, postsPerPage, totalPosts,paginate }) => {
  const [myApi, setMyApi] = useState([]);
  const [q, setQ] = useState("");
  const [serachParam] = useState(["ncr_no"]);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // SearchData
  const searchData = (items) => {
    return items.filter((item) => {
      return serachParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  };

  return (
    <div>
      {/* <Form className="search">
        <img src="/search.png" alt="" className="imgSeach" />
        <Form.Control
          className="form-search"
          type="search"
          placeholder="Search Lotno"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </Form>
      <Table striped bordered className="table-bordered">
        <thead className="thead">
          <tr>
            <th>NCR NO</th>
            <th>Detect On</th>
            <th>Detect At</th>
            <th>NC datail</th>
          </tr>
        </thead>
        {searchData(posts).map((item) => {
          return (
            <tbody key={item._id} className="tbody">
              <tr>
                <td>{item.ncr_no}</td>
                <td>{item.detect_on}</td>
                <td>{item.detect_at}</td>
                <td>{item.nc_detail}</td>
              </tr>
            </tbody>
          );
        })}
      </Table> */}
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a
                onClick={() => paginate(number)}
                href="#"
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Posts;
