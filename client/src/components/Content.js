import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Form,
  Row,
  Table,
  Button,
  Container,
} from "react-bootstrap";

// pages element
import Addpage from "./pages/Addpage";
import Detail from "./pages/Detail";

// routes auth
import { removenc,listnc,updatenc } from "./functions/auth";

const Content = () => {
  const [value, setValue] = useState([]);

  const [q, setQ] = useState("");
  const [serachParam] = useState(["ncr_no"]);

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

  const handdleUpdate = (id)=>{
    console.log(id);
    <Detail/>
    // updatenc(id).then(()=>{
    //   console.log(id);
    //   loadData();
    // }).catch((err)=>{
    //   console.log(err);
    // })
  }

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
      <Form className="mb-4">
        <Addpage />
      </Form>
      <Form>
        <Row>
          <Col xs={8}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>NCR NO.</th>
                  <th>Detect on</th>
                  <th>Detect at</th>
                  <th>NC datail</th>
                  <th></th>
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
                      <td>
                        <Form className="mt-2">
                          <Row>
                            <Col>
                              <Button onClick={()=>handdleUpdate(item._id)}>Detail</Button>
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
    </Container>
  );
};

export default Content;
