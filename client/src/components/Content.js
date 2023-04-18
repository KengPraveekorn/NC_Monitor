import React, { useEffect, useState } from "react";
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

// routes auth
import { removenc, listnc, updatenc } from "./functions/auth";

const Content = () => {
  const [value, setValue] = useState([]);

  const [q, setQ] = useState("");
  const [serachParam] = useState(["ncr_no"]);

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    loadData();
    // console.log(value.length);
  }, []);

  const loadData = () => {
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
    setShow(true);
    console.log(id);
  };

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
                />
                <br />
                <h4>Detech On</h4>
                <Form.Control
                  type="text"
                  id="inputEdit"
                  placeholder={e.detect_on}
                />
                <br />
                <h4>Detech At</h4>
                <Form.Control
                  type="text"
                  id="inputEdit"
                  placeholder={e.detect_at}
                />
                <br />
                <h4>NC Detail</h4>
                <Form.Control
                  type="text"
                  id="inputEdit"
                  placeholder={e.nc_detail}
                />
                <br />
              </Modal.Body>
              <Modal.Footer>
                <Button className="bt-update" onClick={handleUpdate}>
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

  const handleClose = () => setShow(false);

  const handleUpdate = (idData) => {
    updatenc(id)
          .then(() => {
            console.log(id);
            loadData();
          })
          .catch((err) => {
            console.log(err);
          });
    console.log(id);
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
                  <th>NCR NO</th>
                  <th>Detect On</th>
                  <th>Detect At</th>
                  <th>NC datail</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              {searchData(value).map((item) => {
                return (
                  <tbody className="tbody">
                    <tr>
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
      {setModal()}
    </Container>
  );
};

export default Content;
