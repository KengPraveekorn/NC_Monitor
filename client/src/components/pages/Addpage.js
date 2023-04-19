import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Form, Button, Modal } from "react-bootstrap";

// functions
import { addnc } from "../functions/auth";
// import Detail from "./Detail";

// CSS
import "../styles/content.css";

const Addpage = () => {
  const [show, setShow] = useState(false);

  const [data, setData] = useState({
    ncr_no: "",
    detect_on: "",
    detect_at: "",
    nc_detail: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSumbit = async (e) => {
    // e.preventDefault();    // ไม่อยากให้ Refresh หน้า
    console.log(data);
    addnc(data);
    await delay(1000);
    window.location.reload(true);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(data);

  const handdleSave = () => {
    handleClose();
    Swal.fire({
      title: "Do you want to save the changes?",
      text: JSON.stringify(data),
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Saved!",
          icon: "success",
          showConfirmButton: false,
        });
        handleSumbit();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div>
      <Button size="lg" className="bt-add" onClick={handleShow}>
        <img src="/table.png" alt="table" className="imgadd" />
        Add NCR
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header className="headform" closeButton>
          <img className="imgform" src="./checklist.png" alt="" />
          <Modal.Title>NCR FORM</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bodyform">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>NCR NO</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter NCR NO"
                autoFocus
                name="ncr_no"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Detech On</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Detech On"
                name="detect_on"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Detech At</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Detech At"
                name="detect_at"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>NC Detail</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter NC Detail"
                name="nc_detail"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="footeradd">
          <Button
            variant="success"
            disabled={data.ncr_no.length < 9 || data.ncr_no.length > 9}
            onClick={handdleSave}
          >
            Save
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Addpage;
