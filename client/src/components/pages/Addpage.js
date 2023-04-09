import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Form, Button, Modal } from "react-bootstrap";

// functions
import { addnc } from "../functions/auth";
import Detail from "./Detail";

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

  const handleSumbit = (e) => {
    // e.preventDefault();    // ไม่อยากให้ Refresh หน้า
    console.log(data);
    addnc(data);
    // window.location.reload(true);
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
        Swal.fire("Saved!", "", "success");
        handleSumbit();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div>
      <div className="d-grid">
        <Button variant="success" size="lg" onClick={handleShow}>
          ADD +
        </Button>
      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>NCR FORM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                type="text"
                placeholder="Enter Detech On"
                name="detect_on"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Detech At</Form.Label>
              <Form.Control
                type="text"
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={data.ncr_no.length < 9 || data.ncr_no.length > 9}
            onClick={handdleSave}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Addpage;
