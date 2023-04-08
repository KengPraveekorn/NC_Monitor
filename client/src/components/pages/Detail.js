import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Form, Button, Modal } from "react-bootstrap";

// function
import { updatenc, listnc, Readnc } from "../functions/auth";

const Detail = (props) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState([]);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Detail</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>NCR_NO</h4>
          <p></p>
          <h4>Detech On</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
          <h4>Detech At</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
          <h4>NC Detail</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      {/* <Modal size="lg" show={show} onHide={handleClose}>
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
      </Modal> */}
    </div>
  );
};

export default Detail;
