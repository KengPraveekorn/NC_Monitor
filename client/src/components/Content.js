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

// CSS
import "./styles/content.css";

// pages element
import Addpage from "./pages/Addpage";
// import Detail from "./pages/Detail";

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
    removenc(id)
      .then(() => {
        console.log(id);
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handdleUpdate = (idData) => {
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
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Detail
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>NCR_NO</h4>
                <p>id: {e._id}</p>
                <h4>Detech On</h4>
                <p>Detech On: {e.detect_on}</p>
                <h4>Detech At</h4>
                <p>Detech At: {e.detect_at}</p>
                <h4>NC Detail</h4>
                <p>NC Detail : {e.nc_detail}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      });
  };

  const handleClose = () => setShow(false);

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
        <Form className="addpos">
          <Addpage />
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
                  <th></th>
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
                              <Button onClick={() => handdleUpdate(item._id)}>
                                Detail
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                variant="danger"
                                onClick={() => handdleRemove(item._id)}
                              >
                                Delete
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
          <Col lg={3}> 
            <Card>
              <Card.Header className="card-head">NC Total</Card.Header>
              <Card.Body>
                <Card.Title className="card-title">TOTAL</Card.Title>
                <Card.Text className="card-text">{value.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
      {setModal()}

    </Container>
  );
};

export default Content;
