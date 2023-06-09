import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Col,
  Form,
  Row,
  Table,
  Button,
  Container,
  Modal,
} from "react-bootstrap";
import Swal from "sweetalert2";

// CSS
import "./styles/content.css";

// pages element
import Addpage from "./pages/Addpage";
import Pagination from "./functions/Pagination";
import Posts from "./pages/Posts";

// routes auth
import { removenc, listnc, updatenc, Readnc, edit } from "./functions/auth";

const Content = ({ totalPosts }) => {
  const [value, setValue] = useState([]);

  const [q, setQ] = useState("");
  const [serachParam] = useState(["ncr_no"]);

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  const [data, setData] = useState({
    ncr_no: "",
    detect_on: "",
    detect_at: "",
    nc_detail: "",
  });

  const navigate = useNavigate();
  const param = useParams();

  const [updata, setUpdata] = useState("");

  // Paginaton pages
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const pageNumbers = [];

  useEffect(() => {
    loadData();
  }, []);

  // Get current value
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = value.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const loadData = () => {
    setLoading(true);
    listnc().then((res) => {
      console.log(res.data);
      setValue(res.data);
    });
  };

  const searchData = (items) => {
    return items.filter((item) => {
      return serachParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  };

  const handdleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removenc(id)
          .then(() => {
            console.log(id);
            loadData();
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handdleShow = (idData) => {
    setId(idData);
    setData({ ...data });

    setShow(true);
    console.log(id);
  };
  const handleClose = () => setShow(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Update func -----------------------------------
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(data);

  const handleClick = async (e) => {
    let id = e.target.value; // get ค่า value id จากปุ่ม update
    updatenc(id, data) // ส่งค่า _id และค่าที่รับมาจาก form ไปหลังบ้านและ update ค่า
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Update Success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    await delay(1000);
    window.location.reload(true);
  };

  // -----------------------------------

  const setModal = () => {
    return value
      .filter((e) => e._id == id)
      .map((e) => {
        return (
          <>
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={show}
              onHide={handleClose}
              className="modal-detail"
            >
              <Modal.Header className="head-detail" closeButton>
                <Modal.Title
                  className="title-detail"
                  id="contained-modal-title-vcenter"
                >
                  <img src="/file.png" alt="" className="imgfile" />
                  Detail
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>NCR NO</h4>
                <Form.Control
                  type="text"
                  id="inputEdit"
                  placeholder={e.ncr_no}
                  autoFocus
                  name="ncr_no"
                  onChange={(e) => handleChange(e)}
                />
                <br />
                <h4>Detech On</h4>
                <Form.Control
                  type="date"
                  id="inputEdit"
                  placeholder={e.detect_on}
                  name="detect_on"
                  onChange={(e) => handleChange(e)}
                />
                <br />
                <h4>Detech At</h4>
                <Form.Control
                  type="date"
                  id="inputEdit"
                  placeholder={e.detect_at}
                  name="detect_at"
                  onChange={(e) => handleChange(e)}
                />
                <br />
                <h4>NC Detail</h4>
                <Form.Control
                  type="text"
                  id="inputEdit"
                  placeholder={e.nc_detail}
                  name="nc_detail"
                  onChange={(e) => handleChange(e)}
                />
                <br />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="warning"
                  className="bt-update"
                  value={e._id} // รับค่า _id จาก map เก็บไว้ใน value
                  onClick={handleClick}
                  disabled={
                    data.ncr_no.length < 9 ||
                    data.ncr_no.length > 9 ||
                    data.nc_detail.length == ""
                  }
                >
                  Update
                </Button>
                <Button className="bt-close" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      });
  };

  return (
    <Container>
      <div className="d-grid">
        <Form className="search">
          <img src="/search.png" alt="" className="imgSeach" />
          <Form.Control
            className="form-search"
            type="search"
            placeholder="Search Lotno"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </Form>
      </div>
      <Form>
        <Row>
          <Col lg={12} xl={9}>
            <Table striped bordered className="table-bordered">
              <thead className="thead">
                <tr>
                  <th>No.</th>
                  <th>NCR NO</th>
                  <th>Detect On</th>
                  <th>Detect At</th>
                  <th>NC datail</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              {searchData(value).map((item, index) => {
                return (
                  <tbody className="tbody">
                    <tr>
                      <th>{index + 1}</th>
                      <td>{item.ncr_no}</td>
                      <td>{item.detect_on}</td>
                      <td>{item.detect_at}</td>
                      <td>{item.nc_detail}</td>
                      <td>
                        <Form>
                          <Row className="bt-tb">
                            <Col>
                              <Button
                                variant="outline"
                                onClick={() => handdleShow(item._id)}
                              >
                                <img
                                  src="/pencil.png"
                                  alt="Edit"
                                  className="imgedit"
                                />
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                variant="outline"
                                onClick={() => handdleRemove(item._id)}
                              >
                                <img
                                  src="/delete.png"
                                  alt="detele"
                                  className="imgdelete"
                                />
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </Table>
            <Posts
              posts={currentPosts}
              loading={loading}
              postsPerPage={postsPerPage}
              totalPosts={value.length}
              paginate={paginate}
            />
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} />
          </Col>
          <Col lg={3} xl={3}>
            <Form className="addpos">
              <Addpage />
            </Form>
            <Card className="card">
              <Card.Header className="card-head">NC Total</Card.Header>
              <Card.Body>
                {/* <Card.Title className="card-title">TOTAL</Card.Title> */}
                <Card.Text className="card-text">{value.length}</Card.Text>
              </Card.Body>
            </Card>
            <img src="/girl.png" alt="" className="imggirl" />
          </Col>
        </Row>
      </Form>
      <Form>{setModal()}</Form>
    </Container>
  );
};

export default Content;
