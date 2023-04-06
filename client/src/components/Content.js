import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row, Table, Button, Modal, Container } from "react-bootstrap";
// import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";


// api
const urls = "http://localhost:5000/api/ncmoni";

const Content = () => {
  const [value, setValue] = useState([]);
  const [q, setQ] = useState("");

  const [serachParam] = useState(["ncr_no"]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    loadData();
    // console.log(value.length);
  }, []);

  const loadData = () => {
    axios.get(urls).then((res) => {
      console.log("res", res.data);
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

  const handdleClick = () => {
    handleClose();
    Swal.fire({
      title: "Do you want to save the changes?",
      // text: JSON.stringify(formValues),
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  //   const columns = [
  //     {
  //         name: 'NCR NO',
  //         selector: row => row.ncr_no,
  //     },
  //     {
  //         name: 'Detect on',
  //         selector: row => row.detect_on,
  //     },
  //     {
  //         name: 'Detect at',
  //         selector: row => row.detect_at,
  //     },
  //     {
  //         name: 'NC datail',
  //         selector: row => row.nc_detail,
  //     },
  // ];

  return (
    <Container>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Serach Lotno"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </Form>
      <div className="d-grid">
        <Button variant="success" size="lg" onClick={handleShow}>
          ADD +
        </Button>
      </div>
      <Form>
        <Row>
          <Col xs={8}>
            {/* <DataTable columns={columns} data={serachData(value)}/> */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>NCR NO.</th>
                  <th>Detect on</th>
                  <th>Detect at</th>
                  <th>NC datail</th>
                </tr>
              </thead>
              {searchData(value).map((item) => {
                return (
                  <tbody>
                    <tr>
                      <td>{item.ncr_no}</td>
                      <td>{item.detect_on}</td>
                      <td>{item.detect_at}</td>
                      <td>{item.nc_detail}</td>
                    </tr>
                  </tbody>
                );
              })}
            </Table>
          </Col>
          <Col xs={4}>
            <Card>
              <Card.Header>NC Total</Card.Header>
              <Card.Body>
                <Card.Title>TOTAL</Card.Title>
                <Card.Text>{value.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>NCR FORM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>NCR NO</Form.Label>
              <Form.Control type="text" placeholder="Enter NCR NO" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Detech On</Form.Label>
              <Form.Control type="text" placeholder="Enter Detech On" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Detech At</Form.Label>
              <Form.Control type="text" placeholder="Enter Detech At" autoFocus />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>NC Detail</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter NC Detail"/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handdleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Content;
